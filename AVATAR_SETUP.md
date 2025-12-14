# Avatar Setup Instructions

The fake ticket notifications need avatar images for each person in the list. Here's how to set them up:

## Quick Setup

1. Find or create small square images (50x50px to 200x200px) for each person
2. Save them as JPG or PNG files in the `avatars` folder
3. Name them exactly as shown below

## Required Avatar Files

Save these images in the `avatars` folder:

- `kevin.jpg` - Kevin Rudd
- `julia.jpg` - Jack O'Neill
- `tony.jpg` - Elizabeth Bennett
- `malcolm.jpg` - Pippin Took
- `scott.jpg` - Mark Watney
- `beyonce.jpg` - Eugene Fitzherbert
- `taylor.jpg` - Colonel Fitzwilliam
- `ed.jpg` - Eustace Clarence Scrubb
- `adele.jpg` - Hannah Abbott
- `chris.jpg` - Bill Masen
- `margot.jpg` - Joe Quincy
- `hugh.jpg` - Jane Austin
- `nicole.jpg` - Andy Weir
- `russell.jpg` - Richard Wagner
- `cate.jpg` - John Cage

## Where to Find Images

You can:
1. **Google Image Search** - Search for "[person name] face" and save a small image
2. **Use AI** - Generate funny/cartoon versions with AI image generators
3. **Create Your Own** - Use simple profile-style photos or even emoji
4. **Stock Photos** - Use any stock photo site

## Image Tips

- **Square images work best** (the site crops them to circles)
- **Keep file sizes small** (under 100KB each)
- **Face should be centered** for best results
- **Don't worry about perfection** - they're small notifications!

## Customizing the Buyer List

Want to change who appears in the notifications? Edit `script.js`:

1. Open [script.js](script.js)
2. Find the `FAKE_BUYERS` array (around line 9)
3. Add, remove, or modify entries:

```javascript
const FAKE_BUYERS = [
    { name: 'Your Friend Name', avatar: 'avatars/friend.jpg' },
    { name: 'Another Person', avatar: 'avatars/person.jpg' },
    // Add as many as you like!
];
```

## Testing Without Avatars

The notifications will still work without avatar images! If an image fails to load, it simply won't show (the notification will still appear with just the name and text).

## Example Notification

When someone "buys a ticket", you'll see:
```
[Avatar Image] Kevin Rudd ✓
               just bought a ticket!
```

These pop up every 8-20 seconds at random in the bottom-left corner!
