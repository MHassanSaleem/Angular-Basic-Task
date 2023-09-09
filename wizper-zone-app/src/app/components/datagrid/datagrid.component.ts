import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { PaginationInstance, PaginationService } from 'ngx-pagination';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.less'] ,
  animations: [
    trigger('spin', [
      state('spin-in', style({ transform: 'rotate(0deg)' })),
      state('spin-out', style({ transform: 'rotate(360deg)' })),
      transition('spin-in => spin-out', animate('500ms ease-out')),
    ]),
  ],
})
export class DataGridComponent implements OnInit {
  data: any[] = [];  
  @Input() inputData: any;
  searchText: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  p: number = 1; // Current page
  itemsPerPage: number = 3;

  animationState: string = 'spin-in';

  filteredData: any[] = []; // Initialize an array to store filtered data

  constructor(private dataService: DataService, private paginationService: PaginationService) { }

  ngOnInit(): void {
    this.dataService.fetchData().subscribe((response) => {
      this.data = response;

      this.data.forEach((data) => {
        this.dataService.getUserPosts(data.id).subscribe((posts) => {
          // Assuming posts is an array of post data
          data.posts = posts.length; // Assign the number of posts to the user object
        });
      });
      this.applySearchFilter(); // Initial data filter
    });
  }

   // Function to refresh data
   refreshData(): void {
    this.fetchData(); // Re-fetch data
    // Optionally, reset search and pagination here if needed
  }

    // Function to fetch data
    fetchData(): void {
      this.dataService.fetchData().subscribe((response) => {
        this.data = response;
        this.applyPagination(); // Reapply pagination after refreshing
      });
    }

  // Function to apply search filter
  applySearchFilter(): void {
    // Filter data based on the search query
    this.filteredData = this.data.filter((user) => {
      return user.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
    this.applyPagination();
  }

  sortData(): void {
    this.filteredData.sort((a, b) => {
      const nameA: string = a.name.toLowerCase();
      const nameB: string = b.name.toLowerCase();
  
      if (this.sortOrder === 'asc') {
        return nameA < nameB ? -1 : 1;
      } else {
        return nameB < nameA ? -1 : 1;
      }
    });
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortData(); // Call the sorting function to apply the new order
  }

  // Function to set up pagination
  applyPagination(): void {
    this.p = 1; // Reset to the first page
  }

}
