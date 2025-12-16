# Loading System Documentation

## Overview
The loading system provides a comprehensive solution for managing loading states across the entire EventWeb application. It automatically detects and waits for all images, videos, and iframes to load before showing the main content.

## Components

### 1. LoadingScreen
A full-page loading screen with animations, progress bar, and cinema-themed elements.

**Features:**
- Animated spinner with dual rings
- Progress bar with shine effect
- Floating cinema elements (🎬, 🍿, 🎭)
- Responsive design
- Consistent with homepage theme

### 2. LoadingProvider
Context provider that manages global loading state.

**Features:**
- Asset loading detection
- Manual loading state control
- Progress tracking
- Asset reload functionality

### 3. useAssetLoader Hook
Custom hook that monitors all media assets on the page.

**Features:**
- Detects images, videos, and YouTube iframes
- Tracks loading progress
- Handles loading errors gracefully
- Monitors DOM changes for new assets

### 4. LoadingWrapper
Utility component for manual loading control.

## Usage Examples

### Basic Usage (Already Integrated)
The loading system is automatically active when the app starts. No additional setup required.

### Manual Loading Control
```jsx
import { useLoading } from '../context/LoadingContext';

const MyComponent = () => {
  const { setLoading, isLoading, progress } = useLoading();
  
  const handleAsyncOperation = async () => {
    setLoading(true);
    try {
      await someAsyncOperation();
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      {isLoading && <p>Loading: {progress}%</p>}
      <button onClick={handleAsyncOperation}>Start Operation</button>
    </div>
  );
};
```

### Using LoadingWrapper
```jsx
import LoadingWrapper from '../components/LoadingWrapper';

const MyPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate async operation
    setTimeout(() => setIsLoading(false), 2000);
  }, []);
  
  return (
    <LoadingWrapper 
      isLoading={isLoading} 
      loadingText="Loading page content..."
      showGlobalLoader={true}
    >
      <div>Page content here</div>
    </LoadingWrapper>
  );
};
```

### Reloading Assets
```jsx
import { useLoading } from '../context/LoadingContext';

const ReloadButton = () => {
  const { reloadAssets } = useLoading();
  
  return (
    <button onClick={reloadAssets}>
      Reload All Assets
    </button>
  );
};
```

## Configuration

### Minimum Loading Time
The system enforces a minimum loading time of 2 seconds for better UX. This can be adjusted in `useAssetLoader.js`:

```javascript
const minLoadTime = new Promise(resolve => setTimeout(resolve, 2000)); // Adjust time here
```

### Asset Timeout
Assets have a 10-second timeout to prevent infinite loading:

```javascript
setTimeout(() => {
  cleanup();
  resolve(asset);
}, 10000); // Adjust timeout here
```

## Customization

### Styling
The LoadingScreen component uses Tailwind CSS classes. Customize colors and animations by modifying the classes in `LoadingScreen.jsx`.

### Progress Calculation
Progress is calculated as: `(loadedAssets / totalAssets) * 100`

### Asset Detection
The system automatically detects:
- `<img>` tags
- `<video>` tags  
- `<iframe>` tags with YouTube URLs

To add more asset types, modify the `getAllAssets` function in `useAssetLoader.js`.

## Performance Considerations

1. **DOM Monitoring**: The system uses MutationObserver to detect new assets, which is efficient but monitors the entire document.

2. **Memory Usage**: Asset loading promises are cleaned up automatically to prevent memory leaks.

3. **Error Handling**: Failed assets don't block the loading process - they're marked as "loaded" to continue.

## Troubleshooting

### Loading Never Completes
- Check browser console for asset loading errors
- Verify all image/video URLs are accessible
- Check if any iframes are blocked by CORS

### Loading Too Fast/Slow
- Adjust minimum loading time in `useAssetLoader.js`
- Modify asset timeout values
- Check network conditions

### Assets Not Detected
- Ensure assets are in the DOM when loading starts
- Check if assets are added dynamically after initial load
- Verify asset selectors in `getAllAssets` function
