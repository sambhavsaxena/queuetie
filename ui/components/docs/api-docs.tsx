"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CopyBlock, dracula } from 'react-code-blocks'
import { cn } from '@/lib/utils'

export function ApiDocs() {
  const [activeTab, setActiveTab] = useState('overview')
  
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">API Documentation</h1>
        <p className="text-xl text-muted-foreground">
          Everything you need to integrate with the Queuetie email API
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10">
        {/* Sidebar Navigation */}
        <aside className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <nav className="space-y-1">
              {docNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {item.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>
        
        {/* Main Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && <OverviewSection />}
          {activeTab === 'authentication' && <AuthenticationSection />}
          {activeTab === 'sending-emails' && <SendingEmailsSection />}
          {activeTab === 'attachments' && <AttachmentsSection />}
          {activeTab === 'error-handling' && <ErrorHandlingSection />}
          {activeTab === 'rate-limits' && <RateLimitsSection />}
          {activeTab === 'examples' && <ExamplesSection />}
        </div>
      </div>
    </div>
  )
}

function OverviewSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Overview</h2>
      
      <p className="text-lg text-muted-foreground">
        Queuetie provides a simple and reliable API for sending emails through your applications.
        Our RESTful API allows you to send emails with just a few lines of code.
      </p>
      
      <div className="rounded-xl border border-border/60 bg-card/30 p-6 backdrop-blur-sm space-y-4">
        <h3 className="text-xl font-semibold">Base URL</h3>
        <code className="rounded bg-muted px-2 py-1">https://api.queuetie.com/v1</code>
        
        <h3 className="text-xl font-semibold pt-4">Content Type</h3>
        <p>All requests should use JSON with the appropriate content type header:</p>
        <code className="rounded bg-muted px-2 py-1">Content-Type: application/json</code>
        
        <h3 className="text-xl font-semibold pt-4">API Resources</h3>
        <ul className="space-y-2 list-disc pl-6">
          <li>
            <span className="font-medium">POST /send</span> - Send an email
          </li>
          <li>
            <span className="font-medium">GET /status/{'{id}'}</span> - Check email status
          </li>
          <li>
            <span className="font-medium">GET /usage</span> - Check account usage
          </li>
        </ul>
      </div>
      
      <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6">
        <h3 className="text-xl font-semibold mb-2">Getting Started</h3>
        <p className="mb-4">
          To start using the Queuetie API, you need to:
        </p>
        <ol className="space-y-2 list-decimal pl-6">
          <li>Create an account on Queuetie</li>
          <li>Generate an API token from the dashboard</li>
          <li>Use the token to authenticate your API requests</li>
        </ol>
      </div>
    </div>
  )
}

function AuthenticationSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Authentication</h2>
      
      <p className="text-lg text-muted-foreground">
        All API requests must be authenticated using an API token. Tokens can be generated
        and managed from your dashboard.
      </p>
      
      <div className="rounded-xl border border-border/60 bg-card/30 p-6 backdrop-blur-sm space-y-4">
        <h3 className="text-xl font-semibold">Authorization Header</h3>
        <p>Include your API token in the Authorization header of each request:</p>
        <code className="rounded bg-muted px-2 py-1">Authorization: Bearer YOUR_API_TOKEN</code>
        
        <h3 className="text-xl font-semibold pt-4">Token Security</h3>
        <ul className="space-y-2 list-disc pl-6">
          <li>Keep your API tokens secret</li>
          <li>Don&apos;t expose tokens in client-side code</li>
          <li>Use environment variables to store tokens in your applications</li>
          <li>Rotate tokens periodically for enhanced security</li>
        </ul>
      </div>
      
      <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6">
        <h3 className="text-xl font-semibold mb-2">Important</h3>
        <p>
          Never share your API tokens or include them in client-side code. Always keep them secure and use server-side code to make API requests.
        </p>
      </div>
    </div>
  )
}

function SendingEmailsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Sending Emails</h2>
      
      <p className="text-lg text-muted-foreground">
        The primary function of the Queuetie API is to send emails. Use the /send endpoint with the required parameters.
      </p>
      
      <div className="rounded-xl border border-border/60 bg-card/30 p-6 backdrop-blur-sm space-y-4">
        <h3 className="text-xl font-semibold">Endpoint</h3>
        <code className="rounded bg-muted px-2 py-1">POST https://api.queuetie.com/v1/send</code>
        
        <h3 className="text-xl font-semibold pt-4">Request Parameters</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Parameter</th>
                <th className="py-2 px-4 text-left">Type</th>
                <th className="py-2 px-4 text-left">Required</th>
                <th className="py-2 px-4 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 font-mono text-sm">email</td>
                <td className="py-2 px-4">String</td>
                <td className="py-2 px-4">Yes</td>
                <td className="py-2 px-4">Recipient email address</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-mono text-sm">subject</td>
                <td className="py-2 px-4">String</td>
                <td className="py-2 px-4">Yes</td>
                <td className="py-2 px-4">Email subject line</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-mono text-sm">body</td>
                <td className="py-2 px-4">String</td>
                <td className="py-2 px-4">Yes</td>
                <td className="py-2 px-4">Email body content</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-sm">attachments</td>
                <td className="py-2 px-4">Array</td>
                <td className="py-2 px-4">No</td>
                <td className="py-2 px-4">Array of file attachments</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3 className="text-xl font-semibold pt-4">Response</h3>
        <p>A successful request will return a 200 OK response with details about the email:</p>
        
        <div className="mt-2">
          <CopyBlock
            text={`{
  "success": true,
  "message": "Email queued successfully",
  "data": {
    "id": "email_1a2b3c4d5e6f",
    "to": "recipient@example.com",
    "subject": "Hello from Queuetie API",
    "queued_at": "2023-07-21T15:32:10.123Z"
  }
}`}
            language="json"
            theme={dracula}
            codeBlock
            showLineNumbers={false}
          />
        </div>
      </div>
    </div>
  )
}

function AttachmentsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Attachments</h2>
      
      <p className="text-lg text-muted-foreground">
        Queuetie supports sending emails with file attachments. Here&apos;s how to include attachments in your API requests.
      </p>
      
      <div className="rounded-xl border border-border/60 bg-card/30 p-6 backdrop-blur-sm space-y-4">
        <h3 className="text-xl font-semibold">Attachment Format</h3>
        <p>
          Attachments are sent as base64-encoded strings within the attachments array. Each attachment needs a filename and content.
        </p>
        
        <div className="mt-2">
          <CopyBlock
            text={`{
  "email": "recipient@example.com",
  "subject": "Email with Attachment",
  "body": "Please find the attached document.",
  "attachments": [
    {
      "filename": "document.pdf",
      "content": "JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQg...", // base64 encoded content
      "content_type": "application/pdf"
    }
  ]
}`}
            language="json"
            theme={dracula}
            codeBlock
            showLineNumbers={false}
          />
        </div>
        
        <h3 className="text-xl font-semibold pt-4">Attachment Limits</h3>
        <ul className="space-y-2 list-disc pl-6">
          <li>Maximum file size: 10MB per attachment</li>
          <li>Maximum number of attachments: 10 per email</li>
          <li>Supported file types: PDF, images, documents, etc.</li>
        </ul>
      </div>
    </div>
  )
}

function ErrorHandlingSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Error Handling</h2>
      
      <p className="text-lg text-muted-foreground">
        The Queuetie API uses conventional HTTP response codes to indicate the success or failure of an API request.
      </p>
      
      <div className="rounded-xl border border-border/60 bg-card/30 p-6 backdrop-blur-sm space-y-4">
        <h3 className="text-xl font-semibold">HTTP Status Codes</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Status Code</th>
                <th className="py-2 px-4 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 font-mono text-sm">200 - OK</td>
                <td className="py-2 px-4">The request was successful</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-mono text-sm">400 - Bad Request</td>
                <td className="py-2 px-4">The request was invalid or missing required parameters</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-mono text-sm">401 - Unauthorized</td>
                <td className="py-2 px-4">Invalid or missing API token</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-mono text-sm">403 - Forbidden</td>
                <td className="py-2 px-4">The API token doesn&apos;t have permission for the requested action</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-mono text-sm">429 - Too Many Requests</td>
                <td className="py-2 px-4">Rate limit exceeded</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-sm">500 - Server Error</td>
                <td className="py-2 px-4">Something went wrong on our server</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3 className="text-xl font-semibold pt-4">Error Response Format</h3>
        <p>Error responses include an error message and sometimes additional details:</p>
        
        <div className="mt-2">
          <CopyBlock
            text={`{
  "success": false,
  "error": {
    "code": "invalid_request",
    "message": "The 'email' parameter is required",
    "details": {
      "field": "email"
    }
  }
}`}
            language="json"
            theme={dracula}
            codeBlock
            showLineNumbers={false}
          />
        </div>
      </div>
    </div>
  )
}

function RateLimitsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Rate Limits</h2>
      
      <p className="text-lg text-muted-foreground">
        To ensure reliable service for all users, the Queuetie API enforces rate limits on API requests.
      </p>
      
      <div className="rounded-xl border border-border/60 bg-card/30 p-6 backdrop-blur-sm space-y-4">
        <h3 className="text-xl font-semibold">Default Rate Limits</h3>
        <ul className="space-y-2 list-disc pl-6">
          <li>100 requests per minute</li>
          <li>10,000 requests per day</li>
          <li>100,000 emails per month (depending on your plan)</li>
        </ul>
        
        <h3 className="text-xl font-semibold pt-4">Rate Limit Headers</h3>
        <p>
          Each API response includes headers that provide information about your current rate limit status:
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Header</th>
                <th className="py-2 px-4 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 font-mono text-sm">X-RateLimit-Limit</td>
                <td className="py-2 px-4">The maximum number of requests allowed in the current period</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-mono text-sm">X-RateLimit-Remaining</td>
                <td className="py-2 px-4">The number of requests remaining in the current period</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-sm">X-RateLimit-Reset</td>
                <td className="py-2 px-4">The time at which the current rate limit window resets (Unix timestamp)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6">
        <h3 className="text-xl font-semibold mb-2">Pro Tip</h3>
        <p>
          If you need higher rate limits, consider upgrading to our Business or Enterprise plans which offer increased quotas and dedicated support.
        </p>
      </div>
    </div>
  )
}

function ExamplesSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Code Examples</h2>
      
      <p className="text-lg text-muted-foreground">
        Here are examples of how to use the Queuetie API in various programming languages.
      </p>
      
      <Tabs defaultValue="javascript" className="space-y-4">
        <TabsList>
          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
          <TabsTrigger value="python">Python</TabsTrigger>
          <TabsTrigger value="php">PHP</TabsTrigger>
          <TabsTrigger value="ruby">Ruby</TabsTrigger>
          <TabsTrigger value="curl">cURL</TabsTrigger>
        </TabsList>
        
        <TabsContent value="javascript" className="space-y-4">
          <h3 className="text-xl font-semibold">JavaScript (Node.js)</h3>
          <div className="rounded-xl border border-border/60 bg-card/30 p-4 backdrop-blur-sm">
            <CopyBlock
              text={`// Using Fetch API
const sendEmail = async () => {
  const response = await fetch('https://api.queuetie.com/v1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_TOKEN'
    },
    body: JSON.stringify({
      email: 'recipient@example.com',
      subject: 'Hello from Queuetie API',
      body: 'This is a test email sent using the Queuetie API!',
      attachments: []
    })
  });
  const data = await response.json();
  console.log(data);
};

sendEmail().catch(console.error);`}
              language="javascript"
              theme={dracula}
              codeBlock
              showLineNumbers={false}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="python" className="space-y-4">
          <h3 className="text-xl font-semibold">Python</h3>
          <div className="rounded-xl border border-border/60 bg-card/30 p-4 backdrop-blur-sm">
            <CopyBlock
              text={`import requests

url = 'https://api.queuetie.com/v1/send'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_TOKEN'
}
payload = {
    'email': 'recipient@example.com',
    'subject': 'Hello from Queuetie API',
    'body': 'This is a test email sent using the Queuetie API!',
    'attachments': []
}

response = requests.post(url, json=payload, headers=headers)
data = response.json()
print(data)`}
              language="python"
              theme={dracula}
              codeBlock
              showLineNumbers={false}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="php" className="space-y-4">
          <h3 className="text-xl font-semibold">PHP</h3>
          <div className="rounded-xl border border-border/60 bg-card/30 p-4 backdrop-blur-sm">
            <CopyBlock
              text={`<?php
$url = 'https://api.queuetie.com/v1/send';
$data = array(
    'email' => 'recipient@example.com',
    'subject' => 'Hello from Queuetie API',
    'body' => 'This is a test email sent using the Queuetie API!',
    'attachments' => array()
);

$options = array(
    'http' => array(
        'header'  => "Content-type: application/json\r\nAuthorization: Bearer YOUR_API_TOKEN\r\n",
        'method'  => 'POST',
        'content' => json_encode($data)
    )
);

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

print_r(json_decode($result));
?>`}
              language="php"
              theme={dracula}
              codeBlock
              showLineNumbers={false}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="ruby" className="space-y-4">
          <h3 className="text-xl font-semibold">Ruby</h3>
          <div className="rounded-xl border border-border/60 bg-card/30 p-4 backdrop-blur-sm">
            <CopyBlock
              text={`require 'net/http'
require 'uri'
require 'json'

uri = URI.parse('https://api.queuetie.com/v1/send')
header = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer YOUR_API_TOKEN'
}
payload = {
  email: 'recipient@example.com',
  subject: 'Hello from Queuetie API',
  body: 'This is a test email sent using the Queuetie API!',
  attachments: []
}

http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true
request = Net::HTTP::Post.new(uri.request_uri, header)
request.body = payload.to_json

response = http.request(request)
puts JSON.parse(response.body)`}
              language="ruby"
              theme={dracula}
              codeBlock
              showLineNumbers={false}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="curl" className="space-y-4">
          <h3 className="text-xl font-semibold">cURL</h3>
          <div className="rounded-xl border border-border/60 bg-card/30 p-4 backdrop-blur-sm">
            <CopyBlock
              text={`curl -X POST \\
  https://api.queuetie.com/v1/send \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -d '{
    "email": "recipient@example.com",
    "subject": "Hello from Queuetie API",
    "body": "This is a test email sent using the Queuetie API!",
    "attachments": []
  }'`}
              language="bash"
              theme={dracula}
              codeBlock
              showLineNumbers={false}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Navigation items for documentation
const docNavItems = [
  { id: 'overview', title: 'Overview' },
  { id: 'authentication', title: 'Authentication' },
  { id: 'sending-emails', title: 'Sending Emails' },
  { id: 'attachments', title: 'Attachments' },
  { id: 'error-handling', title: 'Error Handling' },
  { id: 'rate-limits', title: 'Rate Limits' },
  { id: 'examples', title: 'Code Examples' },
]