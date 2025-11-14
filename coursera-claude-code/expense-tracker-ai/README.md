# Expense Tracker

A modern, professional expense tracking web application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- **Add Expenses**: Create new expenses with date, amount, category, and description
- **Edit Expenses**: Modify existing expenses with a simple click
- **Delete Expenses**: Remove expenses with confirmation
- **Data Persistence**: All data is stored in browser localStorage for demo purposes

### Categories
- Food
- Transportation
- Entertainment
- Shopping
- Bills
- Other

### Dashboard & Analytics
- **Summary Cards**: View total spending, monthly spending, last 7 days, and top category
- **Monthly Trends**: Bar chart showing spending over the last 6 months
- **Category Breakdown**: Visual representation of spending by category

### Filtering & Search
- **Search**: Find expenses by description
- **Category Filter**: Filter by specific expense categories
- **Date Range**: Filter expenses by start and end dates
- **Clear Filters**: Reset all filters with one click

### Export
- **CSV Export**: Download all expenses as a CSV file for external analysis

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect, useMemo)
- **Storage**: Browser localStorage

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd expense-tracker-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage Guide

### Adding an Expense

1. Fill out the form with:
   - **Date**: Select the date of the expense (defaults to today)
   - **Amount**: Enter the amount in USD
   - **Category**: Choose from the dropdown
   - **Description**: Add a brief description
2. Click "Add Expense"

### Editing an Expense

1. Find the expense in the list
2. Click the "Edit" button
3. Modify the fields in the form
4. Click "Update Expense"
5. Or click "Cancel" to discard changes

### Deleting an Expense

1. Find the expense in the list
2. Click the "Delete" button
3. Confirm the deletion in the popup

### Filtering Expenses

1. Use the search box to find expenses by description
2. Select a category from the dropdown to filter by category
3. Set start and end dates to filter by date range
4. Click "Clear Filters" to reset all filters

### Exporting Data

1. Click the "Export to CSV" button in the filter bar
2. Your browser will download a CSV file with all expenses
3. Open the file in Excel, Google Sheets, or any spreadsheet application

## Project Structure

```
expense-tracker-ai/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx            # Root layout component
│   └── page.tsx              # Main page with expense tracker
├── components/
│   ├── Dashboard.tsx         # Dashboard with summary cards
│   ├── ExpenseForm.tsx       # Form for adding/editing expenses
│   ├── ExpenseList.tsx       # List of expenses with edit/delete
│   ├── FilterBar.tsx         # Search, filter, and export controls
│   └── SpendingChart.tsx     # Charts for spending visualization
├── lib/
│   ├── storage.ts            # localStorage utility functions
│   └── utils.ts              # Helper functions (formatting, export)
├── types/
│   └── expense.ts            # TypeScript type definitions
└── public/                   # Static assets
```

## Features in Detail

### Form Validation
- Amount must be greater than 0
- Description is required
- Date cannot be in the future

### Responsive Design
- Works seamlessly on desktop, tablet, and mobile devices
- Touch-friendly interface for mobile users
- Adaptive layout that reorganizes for smaller screens

### Dark Mode Support
- Automatically detects system preference
- Beautiful dark theme for low-light environments

### User Experience
- Loading states for better feedback
- Confirmation dialogs for destructive actions
- Smooth transitions and animations
- Accessible design with proper ARIA labels

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Data Storage

This application uses browser localStorage to store expense data. This means:
- Data persists across browser sessions
- Data is stored locally on your device
- Data is not synced across devices
- Clearing browser data will delete your expenses

## Future Enhancements

Potential features for future versions:
- Backend API integration
- User authentication
- Cloud data sync
- Budget goals and alerts
- Recurring expenses
- Multiple currencies
- Receipt photo uploads
- Advanced analytics and reports

## License

This project is created for educational purposes.

## Support

For issues or questions, please refer to the project documentation or create an issue in the repository.
