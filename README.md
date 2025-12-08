# Employee Management System

A modern React application for visualizing and managing employee hierarchies with drag-and-drop functionality.

## Note: The video walkthrough for this project is added in the root of the project. File Name - project_video_walkthrough.mov

## 🚀 Features

- **Interactive Organization Chart**: Visualize employee reporting structure in a tree-like format
- **Drag & Drop Manager Reassignment**: Change employee managers by dragging and dropping employee cards
- **Search & Filter**: Find employees by name, designation, or team
- **Team Filtering**: Filter the organization chart by specific teams
- **Responsive Design**: Clean, modern UI with Material Design icons
- **Type-Safe**: Built with TypeScript for robust development
- **API Integration**: Mock Service Worker (MSW) for realistic API interactions

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript + Vite
- **UI Framework**: React Flow for organization chart visualization
- **Drag & Drop**: Atlassian Pragmatic Drag and Drop
- **Styling**: CSS with custom components
- **API Mocking**: MSW (Mock Service Worker)
- **Icons**: Material Design Icons (@mui/icons-material)
- **Package Manager**: pnpm

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **pnpm**: Latest version (recommended) or npm/yarn as alternative

### Installing pnpm (if not already installed)

```bash
# Using npm
npm install -g pnpm

# Using yarn
yarn global add pnpm

# Using Homebrew (macOS)
brew install pnpm
```

## 🚀 Installation & Setup

Follow these steps to get the project running locally:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd employee-management
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start the Development Server

```bash
pnpm run dev
```

The application will start on `http://localhost:5173/` (or the next available port if 5173 is in use).

## 🎯 Usage Guide

### Basic Navigation

1. **Left Panel**: Search and filter employees
2. **Main Canvas**: Interactive organization chart
3. **Controls**: Zoom and view controls in the bottom-right

### Search & Filter Employees

- **Search**: Type in the search box to find employees by name, designation, or team
- **Team Filter**: Use the dropdown to filter by specific teams or show all teams

### Drag & Drop Manager Reassignment

1. **Drag**: Click and hold any employee card
2. **Drop**: Drag the employee onto another employee card
3. **Result**: The dragged employee will now report to the employee they were dropped on
4. **API Update**: The change is automatically saved via API call

**Important Notes:**

- You cannot drop an employee onto themselves
- Circular manager relationships are prevented
- The organization chart updates automatically after successful changes

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── EmployeeCard/    # Employee card component
│   ├── Node/           # Custom node for React Flow
│   ├── ButtonEdge/     # Custom edge for React Flow
│   └── left-panel/     # Search and filter panel
├── hooks/              # Custom React hooks
│   └── useEmployees.ts # Employee data management
├── lib/                # Utility functions
│   └── treeBuilder.ts  # Organization chart builder
├── mocks/              # MSW mock API setup
│   ├── handlers.ts     # API route handlers
│   ├── browser.ts      # Browser worker setup
│   └── data/           # Mock employee data
├── zod-schema/         # TypeScript schemas
└── App.tsx             # Main application component
```

## 🔧 Available Scripts

```bash
# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Build and serve production
pnpm run build:serve

# Run type checking
pnpm run type-check

# Run ESLint
pnpm run lint
```

## 🌐 API Integration

The application uses MSW (Mock Service Worker) to simulate API calls in development:

### Available Endpoints

- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get specific employee
- `PATCH /api/employees/:id` - Update employee manager

### API Request Example

```typescript
// Update manager
PATCH /api/employees/5
Content-Type: application/json
{
  "manager": "2"
}
```

### MSW in Production

This project is configured to use MSW in production as well.

- **Development**: MSW runs via browser worker
- **Production**: MSW runs via service worker
- **No Backend Required**: Fully self-contained application
- **Data Persistence**: Mock data persists during session

```bash
# Build with MSW included
pnpm run build

# Preview production build with MSW
pnpm run preview
```

MSW will intercept all `/api/*` requests in production just like in development.

## 🎨 Customization

### Adding New Employees

Edit `src/mocks/data/employee.ts` to add or modify employee data:

```typescript
{
  id: "11",
  name: "John Doe",
  designation: "Software Engineer",
  team: "Technology",
  manager: "2",
}
```

### Styling

- **Employee Cards**: Modify `src/components/EmployeeCard/employeeCard.css`
- **Custom Nodes**: Modify `src/components/Node/customNode.css`
- **Left Panel**: Modify `src/components/left-panel/leftPanel.css`

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**

   ```bash
   # Kill process on port 5173
   lsof -ti:5173 | xargs kill -9
   ```

2. **Dependencies Issues**

   ```bash
   # Clear cache and reinstall
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

3. **TypeScript Errors**

   ```bash
   # Run type checking
   pnpm run type-check
   ```

4. **MSW Not Working**
   - Ensure you're running in development mode
   - Check browser console for MSW registration messages

### Development Tips

- Use browser DevTools to inspect the React Flow canvas
- Check the Network tab to see MSW API calls
- Console logs show detailed drag-and-drop events

## 🚀 Deployment

### Building for Production

```bash
pnpm run build
```

The build artifacts will be in the `dist/` directory.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the console logs for error messages
3. Ensure all dependencies are properly installed
4. Verify Node.js and pnpm versions are compatible

---

**Happy Coding! 🎉**
