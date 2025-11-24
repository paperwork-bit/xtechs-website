# Setup Rate Limiting in Cloudflare

This guide will help you set up rate limiting to protect your API endpoints from abuse.

## 🛡️ What is Rate Limiting?

Rate limiting restricts how many requests can be made to your API within a certain time period. This helps prevent:
- DDoS attacks
- Spam submissions
- Brute force attempts
- Resource exhaustion

## 📋 Recommended Rate Limits

| Endpoint | Limit | Window | Rationale |
|----------|-------|--------|-----------|
| `/api/leads` | 10 requests | 1 minute | Prevent spam lead submissions |
| `/api/leads/subscribe` | 5 requests | 1 minute | Prevent spam subscriptions |
| `/api/bookings` | 5 requests | 1 minute | Prevent booking abuse |
| `/api/services` (GET) | 60 requests | 1 minute | Allow frequent reads |
| `/api/services` (POST) | 10 requests | 1 minute | Limit admin updates |

## 🔧 Method 1: Cloudflare Rate Limiting Rules (Recommended)

### Step 1: Access Rate Limiting

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your account
3. Navigate to **Security** → **WAF** → **Rate limiting rules**
4. Click **Create rule**

### Step 2: Create Rule for Leads Endpoint

1. **Rule name**: `API Leads Rate Limit`
2. **Action**: Block
3. **Matching expression**:
   ```
   (http.request.uri.path eq "/api/leads" and http.request.method eq "POST")
   ```
4. **Request rate**:
   - Requests: `10`
   - Period: `1 minute`
   - Counting expression: `ip.src`
5. **Action**: Block for `10 minutes`
6. Click **Deploy**

### Step 3: Create Rule for Bookings Endpoint

1. **Rule name**: `API Bookings Rate Limit`
2. **Action**: Block
3. **Matching expression**:
   ```
   (http.request.uri.path eq "/api/bookings" and http.request.method eq "POST")
   ```
4. **Request rate**:
   - Requests: `5`
   - Period: `1 minute`
   - Counting expression: `ip.src`
5. **Action**: Block for `10 minutes`
6. Click **Deploy**

### Step 4: Create Rule for Subscribe Endpoint

1. **Rule name**: `API Subscribe Rate Limit`
2. **Action**: Block
3. **Matching expression**:
   ```
   (http.request.uri.path eq "/api/leads/subscribe" and http.request.method eq "POST")
   ```
4. **Request rate**:
   - Requests: `5`
   - Period: `1 minute`
   - Counting expression: `ip.src`
5. **Action**: Block for `10 minutes`
6. Click **Deploy**

## 🔧 Method 2: Using Cloudflare Workers + KV (Advanced)

If you need more control, you can implement custom rate limiting using Workers and KV storage.

This requires:
1. Creating a Cloudflare Worker
2. Setting up KV namespace
3. Binding KV to Worker
4. Implementing rate limiting logic

**Note**: This is more complex but gives you more flexibility.

## 🧪 Testing Rate Limits

After setting up, test that rate limiting works:

### Test Normal Usage
```bash
# Should work fine (under limit)
for i in {1..5}; do
  curl -X POST https://xtechsrenewables.com.au/api/leads \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@example.com"}'
  sleep 1
done
```

### Test Rate Limit
```bash
# Should be blocked after 10 requests
for i in {1..15}; do
  curl -X POST https://xtechsrenewables.com.au/api/leads \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@example.com"}'
done
```

Expected behavior:
- First 10 requests: Success (200/201)
- Requests 11+: Blocked (429 Too Many Requests)

## 📊 Monitoring Rate Limits

1. Go to **Security** → **Events**
2. Filter by **Rate Limit** action
3. View blocked requests and patterns

## ⚙️ Adjusting Limits

If you find your limits are too strict or too lenient:

1. Go to **Security** → **WAF** → **Rate limiting rules**
2. Click on the rule you want to modify
3. Click **Edit**
4. Adjust the request rate or period
5. Click **Save**

## 🎯 Best Practices

1. **Start Conservative**: Start with lower limits and increase if needed
2. **Monitor Regularly**: Check rate limit events weekly
3. **Whitelist IPs**: If you have legitimate high-volume sources, whitelist them
4. **Different Limits for Different Endpoints**: More sensitive endpoints should have stricter limits
5. **User-Friendly Messages**: Ensure your frontend handles 429 errors gracefully

## 📝 Example Rate Limit Configuration

For a typical website:

```yaml
Leads Endpoint:
  - 10 requests per minute per IP
  - Block for 10 minutes when exceeded
  
Bookings Endpoint:
  - 5 requests per minute per IP
  - Block for 15 minutes when exceeded
  
Subscribe Endpoint:
  - 5 requests per minute per IP
  - Block for 10 minutes when exceeded
```

## 🚨 Important Notes

- Rate limiting rules apply at the Cloudflare edge (before requests reach your server)
- Rules are applied in order (most specific first)
- Free Cloudflare plan has limited rate limiting rules
- Consider upgrading if you need more rules

## ✅ Verification Checklist

- [ ] Rate limiting rules created in Cloudflare Dashboard
- [ ] Rules are enabled and deployed
- [ ] Tested normal usage (works fine)
- [ ] Tested rate limit (properly blocks)
- [ ] Monitoring set up
- [ ] Frontend handles 429 errors gracefully

## 🔄 Updating Limits

As your site grows, you may need to adjust limits:

1. Monitor rate limit events
2. Check if legitimate users are being blocked
3. Adjust limits accordingly
4. Consider implementing different limits for authenticated vs anonymous users

