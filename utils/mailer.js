import nodemailer from 'nodemailer';

async function transformInfo(business) {
  let string = `
	<div style="border-radius: 4px; color: white; background-color: #084766; padding: 10px; margin-bottom: 14px;">
		<h2>Basic company details</h2>
		<ol>
		<li>Company name 1: ${business.companyName1}</li>
		<li>Company name 2: ${business.companyName2}</li>
		<li>Company name 3: ${business.companyName3}</li>
		<li>Business type: ${business.businessType}</li>
		<li>N.G.O Type: ${business.ngoType ? business.ngoType: "None"}</li>
		<li>Company Description:${business.companyDescription}</li>
		</ol>
	</div>
	`
	
	let info = business.info
	for (let i in info) {
		let information =
		`
		\n		
		<div style="border-radius: 4px; color: white; background-color: #084766; padding: 10px; margin-bottom: 14px;">
			<h2>Partner ${Number(i)+1}</h2>
			<ol>
			<li>First name: ${info[i].firstName}</li>
			<li>Last name: ${info[i].lastName}</li>
			<li>Email: ${info[i].email}</li>
			<li>Phone: ${info[i].phone}</li>
			<li>Address: ${info[i].address}</li>
			<li>City: ${info[i].city}</li>
			<li>Zipcode: ${info[i].zipcode}</li>
			</ol>
		</div>
		`
		string+= information
	}
  return string
}


export async function sendMail(to, subject, business ) {
	let information = "";
	if(business.info) {
		information = await transformInfo(business)
	}
	// console.log(information);

	nodemailer.createTestAccount((err, account) => {
		if (err) {
			console.error('Failed to create a testing account. ' + err.message);
			return
		}

		console.log('Credentials obtained, sending message...');

		// Create a SMTP transporter object
		let transporter = nodemailer.createTransport({
				host: account.smtp.host,
				port: account.smtp.port,
				secure: account.smtp.secure,
				auth: {
						user: account.user,
						pass: account.pass
				}
		});

		// Message object
		let message = {
				from: 'Sender Name <sender@example.com>',
				to,
				subject,
				// text,
				html: information
		};

		transporter.sendMail(message, (err, info) => {
				if (err) {
						console.log('Error occurred. ' + err.message);
						return process.exit(1);
				}

				console.log('Message sent: %s', info.messageId);
				// Preview only available when sending through an Ethereal account
				console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		});
	});
}
