# 🔔 Push Notifications - Testing Checklist

## ✅ Complete Setup Guide

Follow these steps to test push notifications:

---

## **Step 1: Open the App**

1. Open your browser to: **http://localhost:5173**
2. Open **Developer Tools** (Press F12)
3. Go to the **Console** tab

---

## **Step 2: Check Service Worker**

In the browser console, you should see:
```
✅ Service Worker registered: [ServiceWorkerRegistration object]
```

If you see an error, refresh the page (Ctrl+R or F5).

---

## **Step 3: Allow Notifications**

1. The app should automatically request notification permission
2. A browser popup will appear asking: **"Allow notifications?"**
3. Click **"Allow"** or **"Yes"**

**Can't see the prompt?**
- Check if notifications are blocked in browser settings
- Go to: `chrome://settings/content/notifications` (Chrome)
- Or click the 🔒 lock icon in the address bar → Site settings → Notifications → Allow

---

## **Step 4: Verify Subscription**

After allowing notifications, check:

### Browser Console
You should see a POST request to `/api/subscribe` in the Network tab.

### Backend Terminal
Should show:
```
POST /api/subscribe 201
```

---

## **Step 5: Create an Assignment**

1. Click **"➕ Add Assignment"** button
2. Enter:
   - **Name**: "Test Assignment"
   - **Due Date**: Tomorrow or any future date
3. Click **"Create Assignment"**

---

## **Step 6: Wait for Notification (10 seconds)**

### What to expect:

**Immediately:**
- Assignment appears in the dashboard
- Backend terminal shows: Assignment created

**After 10 seconds:**
- Backend terminal shows: `📲 Demo push sent for: Test Assignment`
- Browser shows notification popup

---

## **Step 7: Verify Notification**

You should see a browser notification:

```
📬 Notification

Title: Assignment Reminder
Body: "Test Assignment" is due in [X] days.
```

---

## 🐛 **Troubleshooting**

### Issue: No notification permission prompt

**Solution:**
1. Check browser notification settings
2. Reset site permissions:
   - Click 🔒 in address bar
   - Site settings
   - Reset permissions
   - Refresh page

---

### Issue: "Service Worker registration failed"

**Solution:**
Check the error in console. Common fixes:
- Make sure `sw.js` exists in `frontend/public/sw.js`
- Refresh the page
- Clear browser cache (Ctrl+Shift+Delete)

---

### Issue: Subscription not saved

**Check Backend Terminal:**
Should show `POST /api/subscribe 201`

**If not:**
- Backend might not be running
- Check for CORS errors in browser console
- Verify backend is on http://localhost:5000

---

### Issue: No notification after 10 seconds

**Check Backend Terminal:**
Should show: `📲 Demo push sent for: Test Assignment`

**If you see this but no notification:**
1. Check notification permissions are granted
2. Check Do Not Disturb is OFF
3. Check browser notifications are enabled in OS settings

**If you DON'T see this message:**
- Backend might have crashed
- Check backend terminal for errors
- Verify NODE_ENV is not set to "production"

---

### Issue: "No key set vapidDetails.publicKey"

**Solution:**
This means VAPID keys aren't loading. I already fixed this by moving dotenv.config() earlier.

**Restart backend:**
```bash
Ctrl+C
npm run dev
```

---

## 📊 **Debug Commands**

### Check Notification Permission
In browser console:
```javascript
Notification.permission
// Should return: "granted"
```

### Check Service Worker
In browser console:
```javascript
navigator.serviceWorker.getRegistration()
// Should return: ServiceWorkerRegistration object
```

### Check Subscriptions (Backend)
In MongoDB or backend console, check if subscriptions exist.

---

## 🎯 **Expected Flow**

```
1. User opens app
   ↓
2. Service worker registered
   ↓
3. Notification permission requested
   ↓
4. User clicks "Allow"
   ↓
5. Subscription sent to backend
   ↓
6. Backend saves subscription to MongoDB
   ↓
7. User creates assignment
   ↓
8. Assignment saved to DB
   ↓
9. Backend starts 10-second timer
   ↓
10. After 10 seconds, sendPushToAll() called
   ↓
11. Backend fetches all subscriptions
   ↓
12. Sends push to each subscription
   ↓
13. Browser receives push
   ↓
14. Service worker shows notification
   ↓
15. User sees notification! 🎉
```

---

## ✅ **Quick Test**

Run this in browser console to manually check notification:
```javascript
new Notification("Test", { 
  body: "Manual test notification" 
});
```

If this works, your browser permissions are correct!

---

## 🔍 **Check All Components**

### Backend Running ✅
Terminal shows: `✅ Server running on port 5000`

### Frontend Running ✅
Terminal shows: Vite dev server on port 5173

### MongoDB Connected ✅
Backend shows: `✅ MongoDB Connected: localhost`

### Service Worker Registered ✅
Browser console shows: `✅ Service Worker registered`

### Notifications Allowed ✅
Browser shows permission as "granted"

### VAPID Keys Loaded ✅
No errors about "No key set vapidDetails.publicKey"

---

## 🎉 **Success!**

If you see the notification after 10 seconds, everything is working!

You now have:
- ✅ Service worker registered
- ✅ Push notifications enabled
- ✅ Demo mode active (10-second delay)
- ✅ Daily reminders scheduled (8:00 AM)

---

## 📝 **Next Steps**

1. Test creating multiple assignments
2. Test with different due dates
3. Verify daily cron job (wait until 8:00 AM tomorrow)
4. When done with demos, remove demo mode code

---

**Need more help?** Check browser console and backend terminal for specific error messages!
