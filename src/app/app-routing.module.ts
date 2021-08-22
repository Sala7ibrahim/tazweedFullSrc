import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { DashboardMasterComponent } from './admin/dashboard-master/dashboard-master.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AllClientsComponent } from './admin/pages/all-clients/all-clients.component';
import { AllPartnersComponent } from './admin/pages/all-partners/all-partners.component';
import { ControlPannelComponent } from './admin/pages/control-pannel/control-pannel.component';
import { DataAnalysisComponent } from './admin/pages/data-analysis/data-analysis.component';
import { AuthGuard } from './auth.guard';
import { ClientPolicyGuard } from './client-policy.guard';
import { ConfirmResetPasswordComponent } from './confirm-reset-password/confirm-reset-password.component';
import { FAQComponent } from './faq/faq.component';
import { ImageComponent } from './image/image.component';
import { KeepLoggedeGuard } from './keep-loggede.guard';
import { HomeComponent } from './landingPage/home/home.component';
import { LoginComponent } from './login/login.component';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { PreviewProfileDataByAdminComponent } from './preview-profile-data-by-admin/preview-profile-data-by-admin.component';
import { PreviewProfileDataComponent } from './preview-profile-data/preview-profile-data.component';
import { ProfileComponent } from './profile/profile.component';
import { AcceptPartnerComponent } from './projects/accept-partner/accept-partner.component';
import { AddProjectFailComponent } from './projects/add-project-fail/add-project-fail.component';
import { AddProjectSuccessComponent } from './projects/add-project-success/add-project-success.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { AllProjectsComponent } from './projects/all-projects/all-projects.component';
import { ManageMyProjectComponent } from './projects/manage-my-project/manage-my-project.component';
import { MyProjectsComponent } from './projects/my-projects/my-projects.component';
import { PaymestsComponent } from './admin/pages/paymests/paymests.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ProjectThanksComponent } from './projects/project-thanks/project-thanks.component';
import { AdminRegisterComponent } from './register/admin-register/admin-register.component';
import { ClientRegisterComponent } from './register/client-register/client-register.component';
import { PartnerRegisterComponent } from './register/partner-register/partner-register.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AfterLoginHeaderComponent } from './Shared/after-login-header/after-login-header.component';
import { SitePolicyComponent } from './site-policy/site-policy.component';
import { FaqInnerComponent } from './staticPagesAfterLogin/faq-inner/faq-inner.component';
import { LandingComponent } from './staticPagesAfterLogin/landing/landing.component';
import { SiteplicyInnerComponent } from './staticPagesAfterLogin/siteplicy-inner/siteplicy-inner.component';
import { UserPrivilageGuard } from './user-privilage.guard';
import { PricesComponent } from './admin/pages/prices/prices.component';
import { PromoCodesComponent } from './admin/pages/promo-codes/promo-codes.component';
import { PrivilagesModerateComponent } from './admin/pages/privilages-moderate/privilages-moderate.component';
import { ArcheiveComponent } from './admin/pages/archeive/archeive.component';
import { PaymentComponent } from './projects/payment/payment.component';
import { MessagesComponent } from './admin/pages/messages/messages.component';
import { AllProjectsNewComponent } from './admin/pages/all-projects-new/all-projects-new.component';
import { ProfileDetailsInAdminComponent } from './admin/profile-details-in-admin/profile-details-in-admin.component';
import { AcceptPartnerByAdminComponent } from './admin/accept-partner-by-admin/accept-partner-by-admin.component';
import { CartMainComponent } from './cart/cart-main/cart-main.component';
import { MyPurposalsComponent } from './projects/my-purposals/my-purposals.component';
import { ProjectDetailsNoActionsComponent } from './projects/project-details-no-actions/project-details-no-actions.component';
import { SiteServicesComponent } from './site-services/site-services.component';
import { SiteServicesInnerComponent } from './staticPagesAfterLogin/site-services-inner/site-services-inner.component';
import { MessangerComponent } from './messanger/messanger.component';
import { PreviewAllMessagesComponent } from './preview-all-messages/preview-all-messages.component';
import { PreviewAllMessagesAdminComponent } from './admin/pages/preview-all-messages-admin/preview-all-messages-admin.component';
import { NotFoundComponent } from '../app/not-found/not-found.component'
const routes: Routes = [
  
  {path:"",component:HomeComponent,canActivate:[KeepLoggedeGuard]},
  {path:"login",component:LoginComponent,canActivate:[KeepLoggedeGuard]},
  {path:"clientRegister",component:ClientRegisterComponent,canActivate:[KeepLoggedeGuard]},
  {path:"partnerRegister",component:PartnerRegisterComponent,canActivate:[KeepLoggedeGuard]},
  {path:"adminRegister",component:AdminRegisterComponent,canActivate:[KeepLoggedeGuard]},
  {path:"addProject",component:AddProjectComponent,canActivate:[AuthGuard,ClientPolicyGuard]},
  {path:"profile",component:ProfileComponent,canActivate:[AuthGuard]},
  {path:"allProjects",component:AllProjectsComponent,canActivate:[AuthGuard,UserPrivilageGuard]},
  {path:"uploadImage",component:ImageComponent,canActivate:[AuthGuard]},
  {path:"resetPassword",component:ResetPasswordComponent},
  {path:"myProjects",component:MyProjectsComponent,canActivate:[AuthGuard]},
  {path:"myPurposals",component:MyPurposalsComponent,canActivate:[AuthGuard]},
  {path:"confirmResetPasswod",component:ConfirmResetPasswordComponent},
  {path:"afterLoginHeader",component:AfterLoginHeaderComponent},
  {path:"updateProject/:id",component:ManageMyProjectComponent,canActivate:[AuthGuard]},
  {path:"projectSetails/:id",component:ProjectDetailsComponent,canActivate:[AuthGuard]},
  {path:"acceptPartner/:id",component:AcceptPartnerComponent,canActivate:[AuthGuard]},
  {path:"projectDetailsNoActions/:id",component:ProjectDetailsNoActionsComponent,canActivate:[AuthGuard]},
  {path:"siteServicesInner",component:SiteServicesInnerComponent,canActivate:[AuthGuard]},
  {path:"cart",component:CartMainComponent,canActivate:[AuthGuard]},
  {path:"siteServices",component:SiteServicesComponent},
  {path:"successAddedProject",component:AddProjectSuccessComponent},
  {path:"messangerLast",component:MessangerComponent,canActivate:[AuthGuard]},
  {path:"failAddedProject",component:AddProjectFailComponent},
  {path:"admin/login",component:AdminLoginComponent},
  {path:"previewAllMessages/:id",component:PreviewAllMessagesComponent,canActivate:[AuthGuard]},
  // {path:"dashboard",component:DashboardComponent},
  {path:"dashboard",component:DashboardMasterComponent,children:[
    {path:"",component:ControlPannelComponent},
    {path:"adminAllPartners",component:AllPartnersComponent},
    {path:"adminAllClients",component:AllClientsComponent},
    {path:"adminDataAnalysis",component:DataAnalysisComponent},
    // {path:"adminAllProjects",component:AllProjectsComponent},
    {path:"adminAllProjects",component:AllProjectsNewComponent},
    {path:"adminPayments",component:PaymestsComponent},
    {path:"adminAllMessages",component:MessagesComponent},
    {path:"adminPrices",component:PricesComponent},
    {path:"adminPromoCodes",component:PromoCodesComponent},
    {path:"adminPrivilageModerate",component:PrivilagesModerateComponent},
    {path:"adminArcheive",component:ArcheiveComponent},
    {path:"previewProfileDataInAdmin/:id",component:ProfileDetailsInAdminComponent,canActivate:[AuthGuard]},
    {path:"acceptPartnerByAdmin/:id",component:AcceptPartnerByAdminComponent,canActivate:[AuthGuard]},
    {path:"previewProfileDataByAdmin/:id",component:PreviewProfileDataByAdminComponent,canActivate:[AuthGuard]},
    {path:"previewAllMessagesAdmin/:id",component:PreviewAllMessagesAdminComponent,canActivate:[AuthGuard]},
  ]},




  {path:"finishingProjectMessage",component:ProjectThanksComponent},
  {path:"messageDetails",component:MessageDetailsComponent,canActivate:[AuthGuard]},
  {path:"faq",component:FAQComponent},
  {path:"previewProfileData/:id",component:PreviewProfileDataComponent,canActivate:[AuthGuard]},
  // {path:"previewProfileDataByAdmin/:id",component:PreviewProfileDataByAdminComponent,canActivate:[AuthGuard]},
  {path:"sitePolicy",component:SitePolicyComponent},
  {path:"payment",component:PaymentComponent},
  {path:"landingInner",component:LandingComponent,canActivate:[AuthGuard]},
  {path:"faqInner",component:FaqInnerComponent,canActivate:[AuthGuard]},
  {path:"sitePolicyInner",component:SiteplicyInnerComponent,canActivate:[AuthGuard]},
  {path: '404', component:NotFoundComponent},
  {path: '**', redirectTo: '/404'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
