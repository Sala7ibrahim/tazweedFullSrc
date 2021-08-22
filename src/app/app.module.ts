import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './Shared/header/header.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { LoginComponent } from './login/login.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './landingPage/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClientRegisterComponent } from './register/client-register/client-register.component';
import { PartnerRegisterComponent } from './register/partner-register/partner-register.component';
import { AdminRegisterComponent } from './register/admin-register/admin-register.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { AllProjectsComponent } from './projects/all-projects/all-projects.component';
import { ProfileComponent } from './profile/profile.component';
import { AfterLoginHeaderComponent } from './Shared/after-login-header/after-login-header.component'
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxTagsInputModule } from 'ngx-tags-input';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ImageComponent } from './image/image.component';
import { AuthGuard } from './auth.guard';
import { FilterPipe } from './filter.pipe';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmResetPasswordComponent } from './confirm-reset-password/confirm-reset-password.component';
import { MyProjectsComponent } from './projects/my-projects/my-projects.component';
import { MatStepperModule } from '@angular/material/stepper';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { ExportAsModule } from 'ngx-export-as';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { ManageMyProjectComponent } from './projects/manage-my-project/manage-my-project.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { AcceptPartnerComponent } from './projects/accept-partner/accept-partner.component';
import { AddProjectSuccessComponent } from './projects/add-project-success/add-project-success.component';
import { AddProjectFailComponent } from './projects/add-project-fail/add-project-fail.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProjectThanksComponent } from './projects/project-thanks/project-thanks.component';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { FAQComponent } from './faq/faq.component';
import { PreviewProfileDataComponent } from './preview-profile-data/preview-profile-data.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { SitePolicyComponent } from './site-policy/site-policy.component';
import { PaymentComponent } from './projects/payment/payment.component';
import { QuillModule } from 'ngx-quill';
import { LandingComponent } from './staticPagesAfterLogin/landing/landing.component';
import { FaqInnerComponent } from './staticPagesAfterLogin/faq-inner/faq-inner.component';
import { FooterInnerComponent } from './after-login-footer/footer-inner/footer-inner.component';
import { SiteplicyInnerComponent } from './staticPagesAfterLogin/siteplicy-inner/siteplicy-inner.component';
import { PreviewProfileDataByAdminComponent } from './preview-profile-data-by-admin/preview-profile-data-by-admin.component';
import { SideBarComponent } from './admin/side-bar/side-bar.component';
import { DashboardMasterComponent } from './admin/dashboard-master/dashboard-master.component';
import { ControlPannelComponent } from './admin/pages/control-pannel/control-pannel.component';
import { AllPartnersComponent } from './admin/pages/all-partners/all-partners.component';
import { AllClientsComponent } from './admin/pages/all-clients/all-clients.component';
import { DataAnalysisComponent } from './admin/pages/data-analysis/data-analysis.component';
import { PaymestsComponent } from './admin/pages/paymests/paymests.component';
import { MessagesComponent } from './admin/pages/messages/messages.component';
import { PricesComponent } from './admin/pages/prices/prices.component';
import { PromoCodesComponent } from './admin/pages/promo-codes/promo-codes.component';
import { PrivilagesModerateComponent } from './admin/pages/privilages-moderate/privilages-moderate.component';
import { ArcheiveComponent } from './admin/pages/archeive/archeive.component';
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
import { NotFoundComponent } from './not-found/not-found.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ClientRegisterComponent,
    PartnerRegisterComponent,
    AdminRegisterComponent,
    AddProjectComponent,
    AllProjectsComponent,
    ProfileComponent,
    AfterLoginHeaderComponent,
    ImageComponent,
    FilterPipe,
    ResetPasswordComponent,
    ConfirmResetPasswordComponent,
    MyProjectsComponent,
    ManageMyProjectComponent,
    ProjectDetailsComponent,
    AcceptPartnerComponent,
    AddProjectSuccessComponent,
    AddProjectFailComponent,
    AdminLoginComponent,
    DashboardComponent,
    ProjectThanksComponent,
    MessageDetailsComponent,
    FAQComponent,
    PreviewProfileDataComponent,
    AdminHeaderComponent,
    SitePolicyComponent,
    PaymentComponent,
    LandingComponent,
    FaqInnerComponent,
    FooterInnerComponent,
    SiteplicyInnerComponent,
    PreviewProfileDataByAdminComponent,
    SideBarComponent,
    DashboardMasterComponent,
    ControlPannelComponent,
    AllPartnersComponent,
    AllClientsComponent,
    DataAnalysisComponent,
    PaymestsComponent,
    MessagesComponent,
    PricesComponent,
    PromoCodesComponent,
    PrivilagesModerateComponent,
    ArcheiveComponent,
    AllProjectsNewComponent,
    ProfileDetailsInAdminComponent,
    AcceptPartnerByAdminComponent,
    CartMainComponent,
    MyPurposalsComponent,
    ProjectDetailsNoActionsComponent,
    SiteServicesComponent,
    SiteServicesInnerComponent,
    MessangerComponent,
    PreviewAllMessagesComponent,
    PreviewAllMessagesAdminComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    TabsModule,
    NgxTagsInputModule,
    ProgressbarModule,
    NoopAnimationsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ClipboardModule,
    MatStepperModule,
    MatButtonModule,
    ExportAsModule,
    QuillModule.forRoot()
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
