import React from 'react';
import {useLocation} from 'react-router-dom';
import NavBar from '../NavBar';
import SideBar from '../SideBar/index';
import Faqs from './index';

export default function TC(){

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
            <div className="notice tile-about" id="Home">
                    <div className="owner" data-block="owner">
                        <div className='information'>
                                <h2>Terms and Conditions</h2>
                            <div className="author">
                                    {/* -. */}
                            </div>
                            <div className="description">
                                <br /><p><b>1. Terms of Service<br /></b></p>
                                <p>By choosing to visit the Platform and/or avail any Services provided by Company, you agree to be bound by these Terms. Please read the following information carefully. By your continued access or use of the Platform, you signify your agreement to be legally bound by the Terms set forth herein. If you do not agree to the Terms of this agreement, promptly exit this page and stop accessing the Services.</p>

                                <p><b>2. Your Account and Password</b></p>
                                <p>You will be responsible for maintaining confidentiality of your account, password, and restricting access to your computer, and you hereby accept responsibility for all activities that occur under your account and password. You acknowledge that the information you provide, in any manner whatsoever, are not confidential or proprietary and does not infringe any rights of a third party. If you are accessing, browsing and using the Site on someone else’s behalf; you represent that you have the authority to bind that person to all the terms and conditions herein. In the event that the person refuses to be bound as the principal to the Terms of Use, you agree to accept liability for any harm caused by any wrongful use of the Site resulting from such access or use of the Site. If you know or have reasons to believe that the security of your account has been breached, you should contact us immediately at the Contact Information provided below. If we have found a breach or suspected breach of the security of your account, we may require you to change your password, or suspend your account without any liability to codemath</p>

                                <p><b>3. Pricing information</b></p>
                                <p>Prices and availability of products and services provided on the site are subject to change without prior notice and at the sole discretion of Magic corner. we may revise and cease to make available any product/ services at any time</p>

                                <p><b>4. Mode of payment</b></p>
                                <p>Payments for the products available on the Site or on our Sub-Sites may be made in the following ways: Visa/MasterCard/Maestro Cards, Net Banking, Wallet, UPI.</p>

                                <p><b>5. User content</b></p>
                                <p>The information, photo, image, chat communication, text, software, data, music, sound, graphics, messages, videos or other materials transmitted, uploaded, posted, emailed or otherwise made available to us (“User Content“), are entirely your responsibility and we will not be held responsible, in any manner whatsoever, in connection to the User Content. You agree to not encourage or assist or engage others as well as yourself in transmitting, hosting, displaying, uploading, modifying, publishing transmitting, updating or sharing any information that</p>
                                <p>• belongs to another person and to which the user does not have any right to;</p>
                                <p>• is grossly harmful, harassing, blasphemous defamatory, obscene, pornographic, pedophilic, libelous, invasive of another’s privacy, hateful, or racially, ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise unlawful in any manner whatever;</p>
                                <p>• harms minors in any way;</p>
                                <p>• infringes any patent, trademark, copyright or other proprietary rights;</p>
                                <p>• violates any law for the time being in force;</p>
                                <p>• deceives or misleads the addressee about the origin of such messages or communicates any information which is grossly offensive or menacing in nature;</p>
                                <p>• impersonate another person;</p>
                                <p>• contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource;</p>
                                <p>• threatens the unity, integrity, defence, security or sovereignty of India, friendly relations with foreign states, or public order or causes incitement to the commission of any cognizable offence or prevents investigation of any offence or is insulting any other nation</p>
                                <p>We’ll in no way be held responsible for examining or evaluating User Content, nor does it assume any responsibility or liability for the User Content.</p>

                                <p><b>6. License to Use</b></p>
                                <p>We hereby grants You, the limited, non-transferable, non-exclusive, and revocable license to access, view and use the Platform only for the purposes of accessing, viewing, posting or submitting user material, using the embedded link function, placing store orders or for accessing information, applications and services. The Company reserves the right to suspend or deny, in its sole discretion, your access to all or any portion of the Platform. This license is limited to personal and non-commercial uses by You. Any rights not expressly granted to You herein are reserved to Company.</p>
                                <p>You are not permitted to reproduce, transmit, distribute, sub-license, broadcast, disseminate, or prepare derivative works of the Curriculum, product images or any part thereof, in any manner or through any communication channels or means, for any purpose other than the limited purpose mentioned above, without the our prior written consent.</p>

                                <p><b>7. Intellectual Property Rights</b></p>
                                <p>You acknowledge that the Company is the sole and exclusive owner of the Platform, the services provided by the Company, the products, and its content and as such the Company is vested with all the Intellectual Property Rights and other proprietary rights in the Platform, the Services, content and the curriculum.</p>
                                <p>The Company may from time-to-time upload videos, audios/ sound recordings, content and other materials on the website which shall be the exclusive property of the Company. You undertake not reproduce, transmit, retransmit, distribute, publish, post, share or make available the said videos, audios/ sound recordings, content and other materials or any part thereof which are available on the Platform in any manner whatsoever</p>
                                <p>Additionally, the Company also retains all rights (including copyrights, trademarks, patents, designs, logos, trade-dress, trade-secrets, know-how as well as any other intellectual property right) in relation to all information provided on or via this Platform, You shall not copy, download, publish, distribute or reproduce any of the information contained on this Platform or social media in any form without the prior written consent of the Company.</p>
                                <p>All other rights are reserved.</p>

                                
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
