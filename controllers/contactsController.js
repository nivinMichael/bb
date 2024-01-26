import contacts from '../models/contacts.js'
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import APIFilters from '../utils/apiFilters.js';

export const getContacts = catchAsyncErrors(async (req, res, next) => {
    req.body.user = req.user._id;
    const resPerPage = req.query.resPerPage || 4;
    const apiFilters = new APIFilters(contacts, req.query).search().filter();;
  
    let filteredContacts = await apiFilters.query;
    let filteredContactsCount = filteredContacts.length;
  
    apiFilters.pagination(resPerPage);
    filteredContacts = await apiFilters.query.clone();
  
    res.setHeader("Content-Type", "application/json");
  
    res.status(200).json({
      resPerPage,
      filteredContactsCount,
      filteredContacts,
    });
  });

//create a new product
export const newContact = catchAsyncErrors(async (req, res, next) => {
    const { email, phone } = req.body;
   
    const contact = await contacts.findOne({ $or: [{ email }, { phone }] });
   
    if (contact) {
       contact.set(req.body);
       await contact.save();
   
       res.status(200).json({
         message: 'Contact updated successfully',
         contact,
       });
    } else {
       const newContact = await contacts.create(req.body);
   
       res.status(201).json({
         message: 'New contact created successfully',
         newContact,
       });
    }
   });
//to fetch a product details by id 
export const getContactById = catchAsyncErrors( async (req,res,next)=>{
    
    const contactById = await contacts.findById(req?.params?.id)

    if(!contactById){
        return next(new ErrorHandler("Product not found",404))
    }

    res.status(200).json({
        contactById
    })
}
);
//to update a particular product
export const updateContactById = catchAsyncErrors( async (req,res)=>{
    
    let contactById = await contacts.findById(req?.params?.id)

    if(!contactById){
        return next(new ErrorHandler("Product not found",404))
    }

    contactById = await products.findByIdAndUpdate(req?.params?.id, req.body, {new:true})

    res.status(200).json({
        contactById
    })
});

//to Delete a particular product
export const deleteContactById = catchAsyncErrors( async (req,res)=>{
    
    const contactById = await products.findById(req?.params?.id)

    if(!contactById){
        return next(new ErrorHandler("Product not found",404))
    }

 await contactById.deleteOne()

    res.status(200).json({
        message:'Product Deleted'
    })
}
);
