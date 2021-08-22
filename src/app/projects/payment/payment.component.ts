import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
paymentUrl;
  constructor() { }

  ngOnInit(): void {
    this.paymentUrl = localStorage.getItem("paymentUrl");
    window.location.href = this.paymentUrl;


}
}
