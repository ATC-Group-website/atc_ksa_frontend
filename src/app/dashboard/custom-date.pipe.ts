import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'customDate',
  standalone: true,
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    // Define the desired output format
    const format = 'MMM d, y'; // 'Apr 23, 2021'

    // Format the date using Angular's formatDate function
    const locale = 'en-US'; // You can change locale as per your need

    try {
      return formatDate(value, format, locale);
    } catch (error) {
      console.error('Invalid date:', error);
      return value; // Return the original value if the date is invalid
    }
  }
}
