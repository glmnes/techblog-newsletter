---
title: "Understanding React Hooks in 5 Minutes"
date: "2025-01-28"
excerpt: "Quick guide to the most common React hooks and when to use them."
author: "TechBlog Team"
tags: ["React", "JavaScript", "Frontend"]
readTime: "5 min read"
---

# Understanding React Hooks in 5 Minutes

React hooks changed everything when they came out. No more class components everywhere... finally we could use state in functional components.

## The Essential Hooks

### useState

The most basic one. Need to track some data? Here you go:

```javascript
const [count, setCount] = useState(0);

// Update it
setCount(count + 1);
```

Pretty straightforward, right?

### useEffect

This one runs after your component renders. Perfect for API calls or subscriptions:

```javascript
useEffect(() => {
  // Do something after render
  fetchUserData();
  
  // Cleanup function (optional)
  return () => {
    // Clean up subscriptions, etc
  };
}, [dependency]); // Only re-run if dependency changes
```

### useContext

Sharing data between components without prop drilling? Context is your friend:

```javascript
const theme = useContext(ThemeContext);
// Now you have access to theme anywhere in the tree
```

## Common Patterns

Here's a pattern I use all the time for fetching data:

```javascript
function useApiData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading };
}
```

Now you can use it anywhere:

```javascript
const { data, loading } = useApiData('/api/users');
```

## Quick Tips

- Don't call hooks inside loops or conditions
- Always use the dependency array in useEffect (even if it's empty)
- Custom hooks are just functions that start with "use"
- When in doubt, check if you really need that useEffect

That's basically it. Hooks aren't complicated once you get the hang of them. Start with useState and useEffect, and you'll figure out the rest as you go.
