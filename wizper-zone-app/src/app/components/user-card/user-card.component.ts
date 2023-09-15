import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.less']
})
export class UserCardComponent implements OnInit {
  data: any[] = [];

  @Input() inputData: any; //Define an Input property named inputData
  imageUrl: string = '';
  constructor(private dataService: DataService, private router: Router) { }

  onCardClick(userId: number) {
    this.router.navigate(['/user', userId]); // Navigate to the user details view with the user's ID as a parameter
  }

  ngOnInit(): void {
    this.dataService.fetchData().subscribe((response) => {
      this.data = response;
      this.generateImageUrl();
    });
  }

  generateImageUrl(): void {
    const initials = this.inputData.name.split(' ').map((name : string) => name[0]).join('').toUpperCase();
    this.imageUrl = `https://fakeimg.pl/280x200/?text=${initials}`;
  }

}
