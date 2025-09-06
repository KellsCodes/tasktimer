export const defaultHomePage = () => {
  return `
            <html>
                    <head>
                        <title>Time.It | Welcome</title>
                    </head>
                    <body>
                        <div style="height:97vh; width:95vw; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: auto">
                            <h1>Hello from Time.It</h1>
                            <p>This is the default page!!</p>
                            <a href="/register" target="_blank" style="background:#4F46E5; color:#fff; padding:10px 15px; 
                                text-decoration:none; border-radius:5px; display:inline-block;">Click here to sign up</a>
                        </div>
                    </body>
            </html>
        `;
};
