#How to avoid XSS in both server and client side?

##Escaping output automatically in react because react escapes values by default in jsx
That means suppose: JSX has below lines

const user = {name: "<script>alert('xss')</script>" };
return <div>Welcome, {user.name}</div>

React automatically escapes <script> ...</script> tags. So this render as plain text like below.
So the script would not execute and no XSS attacks.

## Server side escaping

For example using handlebars for templating where the templating engine escapes special characters like:

- <
- >
- "

So here also script tag also will not become executable.

<div>Welcome, &lt;script&gt;alert('xss')&lt;/script&gt;</div>

<div>Welcome, {{user.name}}</div>
Handlebars
Special chars so these would not allow <Script>alert('xss')</>
<
>
"

WARNING: NEVER USE dangerouslySetInnerHTML as it disables escaping which is dangerous if user.name is an maliciously executable script
