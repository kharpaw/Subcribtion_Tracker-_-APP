import { MongoOIDCError } from "mongodb";
import mongoose from "mongoose"

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subcribtion is required'],
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subcribtion price is required'],
        min: [0, 'Price must be greater then 0'],
        max: [1000, 'Price must be less then 1000']

    },
    currency: {
        type: String,
        enum: ['USD, EUR, RUPPE'],
        default: 'RUPPEE'


    },
    frequency: {
        type: String,
        enum: ['daily', 'monthly', 'yearly'],

    },
    category: {
        type: String,
        enum: ['Sport', 'news', 'entertainment', 'lifestyle', 'technology', 'finace', 'politics'],
        required: true
    },
    paymentMethod: {
        type: String,
        require: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['Active', 'cancellled', 'expired'],
        dafault: 'Actuve',
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date most be in Past'
        },
        
    },
    renewalDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'Renewal date must be after the start date'
            
        }
    },
     user: {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
         index: true,
        

    }
    
}, { timestamps: true });


// Auto calculate renewal date if mising
subscriptionSchema.pre('save', function () {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate()+renewalPeriods[this.frequency]
        )

    }
    // Auto update the status  if renewal date has passed

    if (this.renewalDate < new Date()) {
        this.status = 'expired'
    }

    next();
})

const Subcribtion = mongoose.model('Subcribtion', subscriptionSchema)

export default Subcribtion;