import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true, // Add standalone: true
  imports: [CommonModule] // Include CommonModule
})
export class LoadingComponent implements OnInit {
  loading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {}
}
