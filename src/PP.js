import React from 'react';
import {useLocation} from 'react-router-dom';
import NavBar from './navbar';
import SideBar from './SideBar';
import Faqs from './faqs';

export default function PP(){

    const Location = useLocation();

    return(
        <>
            {
                (Location.state === null)?<NavBar Received={{page : "Q"}}/>:(Location.state.user === undefined)?<NavBar Received={{page : "Q"}}/>:
                <NavBar Received={ {page : "H", status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Location.state === null)?<SideBar Received={null}/>:(Location.state.user === undefined)?<SideBar Received={null}/>:
                <SideBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            <div className="notice tile-about">
                    <div className="owner" data-block="owner">
                        <div className='information'>
                                <h2>Privacy Policy</h2>
                            <div className="author">
                                    {/* -. */}
                            </div>
                            <div className="description">
                                <br /><p>This Privacy Policy (“Policy“) describes the type of personal information we collect from our User, purpose for collecting such information, how we use it, with whom we share it and the choices available to our customers regarding our use of the information. We will not disclose the personal information and sensitive information (meanings ascribed in clause 2 below) shared by the user other than in compliance with this Policy. If you do not consent to any of the terms enumerated in this Policy, do not proceed to use the Site.</p>
                                <p>This Privacy Policy (“Policy“) describes the type of personal information we collect from our User, purpose for collecting such information, how we use it, with whom we share it and the choices available to our customers regarding our use of the information. We will not disclose the personal information and sensitive information (meanings ascribed in clause 2 below) shared by the user other than in compliance with this Policy. If you do not consent to any of the terms enumerated in this Policy, do not proceed to use the Site.</p>

                                <p><b>1. WHAT WE COLLECT</b></p>
                                <p>We may collect personal identifiable information from you when you save or otherwise provide us when you set up a free account with the Site OR when you communicate with us via phone, email, chat, etc OR when you fill an entry to participate in any contest, promotion, or survey, etc OR when you participate in one of our events. As a result of these actions you might supply us with personal information, such as your name, e-mail and postal addresses, phone number(s), product/course interest information and in certain circumstances, your opinions and individual preferences, etc (collectively “Personal Information“).</p><p>When you visit this Site, our social media platforms, or our social networking or mobile applications, may also collect certain information about your device or usage by automated means or by using technologies such as cookies, web server logs, and analytics platforms like Google.</p><p>Today, we do not collect any financial information. For online payment transactions, your credit card / bank info is saved with the payment processor and not with us. In the future, if we change our payment flow, we may store your financial information such as Bank account or credit card or debit card or other payment instrument details, in order to provide you a quicker checkout flow.</p><p>This Site is meant to be visited by adults (above the age of 18) as well as minors (school students who may be looking for online / offline learning opportunities), but any financial transaction (e.g. online payment) or enrollment is to be done by adults over the age of 18. If you are not an adult, please do not fill out the forms or use your parents’payment info without their supervision and approval. We do not collect any personal information from Minors (under 18). In an event of default by the minor, the parent or the guardian will be liable to compensate for whatsoever damages arising out of such wrongful use by the minor.</p>

                                <p><b>2. How do we use your Personal Data?</b></p>
                                <p>• To improve our products and services</p>
                                <p>• To communicate with you regarding existing products and services availed by you, including notifications of any alerts or updates or surveys</p>
                                <p>• To evaluate, develop and improve our products and services</p>
                                <p>• For market and product analysis and market research</p>
                                <p>• To send you information about our other products or services which may be of interest to you (you may always opt out of this ongoing marketing communications by clicking an “Unsubscribe” link in the footer of each email)</p>
                                <p>• To handle enquiries and complaints</p>
                                <p>• To investigate, prevent, or take action regarding illegal activities, suspected fraud and situations involving potential threats to the safety of any person</p>
                                <p>• To verify your identity</p>
                                <p>• To deliver our products and services</p>
                                <p>• With the necessary consent, to publicize, post and display the projects and/or apps created by your child on our website or related pages or any other social media platforms along with your personal information in accordance with applicable laws</p>
                                <p>• By using magiccorner.in and/or registering yourself atmagiccorner.in you authorize Magic corner (including its representatives, affiliates, and its business partners) to contact you via email or phone call or sms and offer you our services for the product you have opted for, imparting product knowledge, offer promotional offers running on codemath.in and offers by its business partners and associated third parties, for which reasons your information may be collected in the manner as detailed under this Policy. You hereby agree that you authorize codemath.in to contact you for the above mentioned purposes even if you have registered yourself under DND or DNC or NCPR service(s). Your authorization, in this regard, shall be valid as long as your account is not deactivated by either you or us.</p>
                                
                                <p><b>3. WITH WHOM WE SHARE THE PERONAL AND SENSITVE INFORMATION</b></p>
                                <p>Nobody. Magic corner is not in the business of collecting and selling information, and we will not sell it or provide your Personal Info and Sensitive Info to any other organization. We will use this information only to serve you better through targeted products and course offerings.</p>
                                <p>For online payments, your financial info (credit card numbers, billing address, etc.) will be entered by you directly into our payment processor’s web page and stored by them securely – it will not live in our databases.</p>
                                <p>Should we plan to merge/sell all or substantially all of our business to another business entity or similar other transaction or be required by that business entity, we may transfer or disclose your Personal Information and Sensitive Information to that business entity who may collect, use or disclose such information for the purposes of evaluating the proposed transaction or for operating and managing the affairs of the acquired business or for other purposes identified in this Policy.</p>
                                <p>Notwithstanding anything contained in this Privacy Policy, we reserve the right to disclose any Personal Information or Sensitive Information that may be required to be disclosed mandatorily under applicable law or where the disclosure is necessary to comply with any legal obligation or to law enforcement authorities or other government officials, without prior notice or consent of the site / app user.</p>
                                
                                <p><b>4. COOKIES</b></p>
                                <p>We may track your preferences and activities on the Site. “Cookies” are small data files transferred to your computer’s hard-drive by a website. They keep a record of your activities on the Site making your subsequent visits to the site more efficient. Cookies may store a variety of information, including, the number of times that you access a site, registration information and the number of times that you view a particular page or other item on the site. The use of cookies is a common practice adopted by most major sites to better serve their clients. Most browsers are designed to accept cookies, but they can be easily modified to block cookies.</p>
                                <p>By continuing the use of the Site, you are agreeing to our use of cookies. If you do not agree to our use of cookie, you can block them in your browser setting, but you may lose some functionality on the Site.</p>

                            </div>
                            <div className="cb"></div>
                        </div>
                    </div>
                </div>
        {
            (Location.state === null)?<Faqs Received={null}/>:(Location.state.user === undefined)?<Faqs Received={null}/>:
            <Faqs Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
        }
        </>
    )
}
