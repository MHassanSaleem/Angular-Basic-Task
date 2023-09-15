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
  userId: number = 0; // Initialize with a default value
  userDetails: UserDetails | null = null; // Initialize as null or with a default value
  firstName: string = '';
  lastName: string = '';


  constructor(private route: ActivatedRoute, private userService: DataService) {}

  ngOnInit(): void {
    // Get the user ID from the route parameters
    this.route.params.subscribe((params) => {
      this.userId = +params['id']; // Convert the ID to a number
      // Fetch user details based on the ID
      this.userService.getUserDetails(this.userId).subscribe((data) => {
        this.userDetails = data;
      });
    });
  }
}
