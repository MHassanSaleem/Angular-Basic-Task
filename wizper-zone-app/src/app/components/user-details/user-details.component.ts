import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { UserDetails } from './user-details.modal';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.less']
})
export class UserDetailsComponent {
  
  postData: any[] = [];
  userId: number = 0; // Initialize with a default value
  userDetails: UserDetails | null = null; // Initialize as null or with a default value
  firstName: string = '';
  lastName: string = '';
  imageUrl: string = '';

  constructor(private route: ActivatedRoute, private userService: DataService) {}

  ngOnInit(): void {
    // Get the user ID from the route parameters
    this.route.params.subscribe((params) => {
      this.userId = +params['id']; // Convert the ID to a number
      // Fetch user details based on the ID
      this.userService.getUserDetails(this.userId).subscribe((data) => {
        this.userDetails = data;
        // Split full name into first and last names
        const fullName = this.userDetails?.name || '';
        const names = fullName.split(' ');
        if (names.length >= 2) {
          this.firstName = names[0];
          this.lastName = names[names.length - 1];
        } else if (names.length === 1) {
          this.firstName = names[0];
        }
        // Perform null check before calling generateImageUrl
        if (this.userDetails !== null) {
          this.generateImageUrl(this.userDetails);
        }

      });
    // Fetch post data based on userId
      this.userService.getUserPosts(this.userId).subscribe((data) => {
        this.postData = data;
      });
    });
  }

  //fake image function
  generateImageUrl(userDetails: UserDetails): void {
    const initials = this.userDetails?.name.split(' ').map((name : string) => name[0]).join('').toUpperCase();
    this.imageUrl = `https://fakeimg.pl/200x200/?text=${initials}`;
  }
}
