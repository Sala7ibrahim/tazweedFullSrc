import { Component, OnInit } from '@angular/core';
import { faFacebookF,faTwitter,faInstagram,faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer-inner',
  templateUrl: './footer-inner.component.html',
  styleUrls: ['./footer-inner.component.css']
})
export class FooterInnerComponent implements OnInit {
  dateNow;
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faLinkedinIn = faLinkedinIn;
   sessionUserType;
   showPartnerPart = false;
   showClientPart = false;
  constructor() { }

  ngOnInit(): void {
    this.dateNow = new Date();

    this.sessionUserType = localStorage.getItem("sessionUserType");
    if (this.sessionUserType == "partner") {
      this.showPartnerPart = true;
      this.showClientPart = false;
    }
    else {
      this.showPartnerPart = false;//showPartnerPart showClientPart
      this.showClientPart = true;
    }
  }

}
