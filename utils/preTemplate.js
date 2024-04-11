import { Info } from "../models/infoModel.js"

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const formatDate = (date)=>{
    const dob = new Date(date)
    const day = dob.getDate();
    const monthIndex = dob.getMonth();
    const year = dob.getFullYear();

    return `${day} / ${months[monthIndex]} / ${year}`;

}

export const preString = async (data)=>{
    const infos =await Info.find({ _id: { $in: data.business.info } })
    data.business
    let infoArray =""
    infos.map((item)=>{
        let infostring =`
        <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
            <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">FirstName :</span>
            <span>${item.firstName}</span>
        </div>
        
        <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
            <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">LastName :</span>
            <span>${item.lastName}</span>
        </div>
        
        <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
            <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">Email :</span>
            <span>${item.email}</span>
        </div>
        
        <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
            <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">Phone :</span>
            <span>${item.phone}</span>
        </div>

        ${item.shares?`<div style="text-align: center;  margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
        <span style="font-weight: bold; font-size:1em; margin-right: 24px;">SHares :</span>
        <span>${item.shares}</span>
        </div>`:""}

        <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
            <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">City :</span>
            <span>${item.city}</span>
        </div>

        <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
            <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">State :</span>
            <span>${item.state}</span>
        </div>

        <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
            <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">officeNumber :</span>
            <span>${item.officeNumber}</span>
         </div>

         <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
            <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">officeStreet :</span>
            <span>${item.officeStreet}</span>
         </div>
        
         <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
            <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">dateOfBirth :</span>
            <span>${formatDate(item.dateOfBirth)}</span>
         </div>

         <div style="display: block; margin-top: 1.5rem;">
            <h4 style="text-align: center;">Signature</h4>
            <img style="border-radius: 0.25rem ; display: block; width: 6rem; height: 6rem; object-fit: contain; display: block; margin-bottom: 0.625rem; margin-left: auto; margin-right: auto;" src="https://res.cloudinary.com/da3wqzkz3/image/upload/v1690586012/${item.signature}"/>

            <h4 style="text-align: center;">User identity</h4>
            <img style="border-radius: 0.25rem ;  display: block; width: 6rem; height: 6rem; object-fit: contain; display: block; margin-bottom: 0.625rem; margin-left: auto; margin-right: auto;" src="https://res.cloudinary.com/da3wqzkz3/image/upload/v1690586012/Cloudinary-React/${item.userid}"/>

            <h4 style="text-align: center;">Passport</h4>
            <img style="border-radius: 0.25rem ; display: block; width: 6rem; height: 6rem; object-fit: contain; display: block; margin-bottom: 0.625rem; margin-left: auto; margin-right: auto;" src="https://res.cloudinary.com/da3wqzkz3/image/upload/v1690586012/Cloudinary-React/${item.passport}"/>
        </div>
        `
        infoArray+=infostring
    })

    let string = `   <div style="background-color: #dfebe9; padding-top: 1rem; border-radius: 0.5em;">
    <h1 style="text-align: center; margin-bottom: 0.6rem;">JohnWellForms</h1>
    <h3 style="text-align: center; font-weight: 600; margin-bottom: 0.4rem; text-transform: capitalize;">Basic Details</h3>
    
    <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
        <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">FirstName :</span>
        <span>${data.firstName}</span>
    </div>
    
    <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
        <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">Surname :</span>
        <span>${data.surName}</span>
    </div>
    
    <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
        <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">MiddleName :</span>
        <span>${data.middleName}</span>
    </div>
    
    <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
        <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">Email :</span>
        <span>${data.email}</span>
    </div>
    
    <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
        <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">Phone :</span>
        <span>${data.phone}</span>
    </div>

      
    <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
        <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">City :</span>
        <span>${data.city}</span>
    </div>

    <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
        <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">State :</span>
        <span>${data.state}</span>
    </div>
    
    <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
        <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">streetName :</span>
        <span>${data.streetName}</span>
    </div>
    
    <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
        <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">Date Of Birth :</span>
        <span>${formatDate(data.dateOfBirth)}</span>
    </div>
    
        
    ${data.shares?`<div style="text-align: center;  margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
        <span style="font-weight: bold; font-size:1em; margin-right: 24px;">SHares :</span>
        <span>${data.shares}</span>
    </div>`:""}
    
    <div style="display: block; margin-top: 1.5rem;">
        <h4 style="text-align: center;">Signature</h4>
        <img style="border-radius: 0.25rem ; display: block; width: 6rem; height: 6rem; object-fit: contain; display: block; margin-bottom: 0.625rem; margin-left: auto; margin-right: auto;" src="https://res.cloudinary.com/da3wqzkz3/image/upload/v1690586012/${data.signature}"/>

        <h4 style="text-align: center;">User identity</h4>
        <img style="border-radius: 0.25rem ;  display: block; width: 6rem; height: 6rem; object-fit: contain; display: block; margin-bottom: 0.625rem; margin-left: auto; margin-right: auto;" src="https://res.cloudinary.com/da3wqzkz3/image/upload/v1690586012/${data.userid}"/>

        <h4 style="text-align: center;">Passport</h4>
        <img style="border-radius: 0.25rem ; display: block; width: 6rem; height: 6rem; object-fit: contain; display: block; margin-bottom: 0.625rem; margin-left: auto; margin-right: auto;" src="https://res.cloudinary.com/da3wqzkz3/image/upload/v1690586012/${data.passport}"/>
    </div>

    <h3 style="text-align: center; font-weight: 600; margin-bottom: 0.4rem; margin-top: 0.8rem; ; text-transform: capitalize;">Company Details</h3>


    <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
        <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">CompanyName1 :</span>
        <span>${data.business.companyName1}</span>
    </div>

    <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
        <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">CompanyName2 :</span>
        <span>${data.business.companyName2}</span>
    </div>

    ${data.business.companyName3?`<div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
        <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">CompanyName3 :</span>
        <span>${data.business.companyName3}</span>
    </div>`:''}

    <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
        <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">BusinessType :</span>
        <span>${data.business.businessType}</span>
    </div>

    ${data.business.ngoType?`<div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
        <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">NGOType :</span>
        <span></span>
    </div>`:""}

    <div style="text-align: center; margin-top: 0.2rem; font-size: 1rem; justify-content: space-between;">
        <span style="font-weight: bold; font-size: 1em; margin-right: 24px;">CompanyDescription :</span>
        <span>${data.business.companyDescription}</span>
    </div>

    ${data.business.info.length>0 ? `
    <h3 style="text-align: center; font-weight: 600; margin-bottom: 0.4rem; margin-top: 0.8rem; ; text-transform: capitalize;">Partners Details</h3>
    ${infoArray}
    `:""
    }
</div>
// `
//    
    return string
}
