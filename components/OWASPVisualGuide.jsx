import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Shield, Lock, Database, Code, AlertTriangle, Package, Key, RefreshCw, LineChart, Globe } from 'lucide-react';

const OWASPVisualGuide = () => {
  const [activeVulnerability, setActiveVulnerability] = useState(null);

  const vulnerabilities = [
    {
      id: 1,
      title: "Broken Access Control",
      icon: <Shield className="w-12 h-12 text-red-500" />,
      visual: (
        <div className="bg-slate-100 p-4 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-48 bg-white p-2 rounded border border-gray-300">
              <div className="text-sm text-gray-600">Original URL</div>
              <div className="font-mono text-xs">/user/123</div>
            </div>
            <div className="text-2xl">→</div>
            <div className="w-48 bg-white p-2 rounded border-2 border-red-500">
              <div className="text-sm text-gray-600">Modified URL</div>
              <div className="font-mono text-xs">/user/456</div>
              <div className="text-xs text-red-500 mt-1">Unauthorized Access!</div>
            </div>
          </div>
        </div>
      ),
      description: "Attackers can bypass access controls by modifying URLs or parameters to access unauthorized resources."
    },
    {
      id: 2,
      title: "Cryptographic Failures",
      icon: <Lock className="w-12 h-12 text-red-500" />,
      visual: (
        <div className="bg-slate-100 p-4 rounded-lg">
          <div className="space-y-2">
            <div className="bg-white p-2 rounded border border-gray-300">
              <div className="font-mono text-xs">Encrypted: x8j2m9p4k7...</div>
            </div>
            <div className="text-center">↓</div>
            <div className="bg-white p-2 rounded border-2 border-red-500">
              <div className="font-mono text-xs text-red-500">
                password123
                <br />
                admin123
                <br />
                welcome2024
              </div>
            </div>
          </div>
        </div>
      ),
      description: "Sensitive data exposure due to weak or missing encryption, allowing attackers to read confidential information."
    },
    {
      id: 3,
      title: "Injection",
      icon: <Code className="w-12 h-12 text-red-500" />,
      visual: (
        <div className="bg-slate-100 p-4 rounded-lg">
          <div className="space-y-4">
            <div className="bg-white p-2 rounded">
              <div className="text-sm">Login Form</div>
              <input 
                type="text" 
                value="' OR '1'='1' --" 
                readOnly
                className="w-full mt-1 p-1 font-mono text-xs border border-red-500 rounded"
              />
            </div>
            <div className="bg-white p-2 rounded font-mono text-xs">
              <div className="text-gray-600">SQL Query:</div>
              <div className="text-red-500">
                SELECT * FROM users WHERE username='' OR '1'='1' --' AND password='*****'
              </div>
            </div>
          </div>
        </div>
      ),
      description: "Malicious code injection into application inputs that gets executed by the backend system."
    },
    {
      id: 4,
      title: "Insecure Design",
      icon: <AlertTriangle className="w-12 h-12 text-red-500" />,
      visual: (
        <div className="bg-slate-100 p-4 rounded-lg">
          <div className="space-y-2">
            <div className="bg-white p-3 rounded border border-gray-300">
              <div className="text-sm mb-2">Security Question:</div>
              <div className="font-medium">What's your pet's name? 🐕</div>
            </div>
            <div className="flex justify-center space-x-4">
              <div className="bg-white p-2 rounded text-xs text-center">
                👤 Owner
                <div className="mt-1">Fluffy</div>
              </div>
              <div className="bg-white p-2 rounded text-xs text-center">
                👥 Friends
                <div className="mt-1">Fluffy</div>
              </div>
              <div className="bg-white p-2 rounded text-xs text-center">
                🌍 Social Media
                <div className="mt-1">Fluffy</div>
              </div>
            </div>
          </div>
        </div>
      ),
      description: "Security weaknesses caused by flawed design choices, like using easily guessable security questions."
    },
    {
      id: 5,
      title: "Security Misconfiguration",
      icon: <AlertTriangle className="w-12 h-12 text-red-500" />,
      visual: (
        <div className="bg-slate-100 p-4 rounded-lg">
          <div className="bg-white p-3 rounded border-2 border-red-500">
            <div className="text-sm font-medium mb-2">Error Details:</div>
            <div className="font-mono text-xs text-red-500">
              Database Connection Error
              <br />
              Server: db.example.com
              <br />
              Username: admin
              <br />
              Password: db_pass_123
            </div>
          </div>
        </div>
      ),
      description: "Exposed error messages or default configurations that reveal sensitive system information."
    },
    {
      id: 6,
      title: "Vulnerable Components",
      icon: <Package className="w-12 h-12 text-red-500" />,
      visual: (
        <div className="bg-slate-100 p-4 rounded-lg">
          <div className="space-y-2">
            <div className="bg-white p-2 rounded border border-gray-300">
              <div className="flex justify-between items-center">
                <div className="text-sm">Current Version: 1.2.3</div>
                <div className="text-xs text-red-500">⚠️ Vulnerable</div>
              </div>
            </div>
            <div className="bg-white p-2 rounded border border-green-500">
              <div className="flex justify-between items-center">
                <div className="text-sm">Latest Version: 2.0.1</div>
                <div className="text-xs text-green-500">✓ Secure</div>
              </div>
            </div>
          </div>
        </div>
      ),
      description: "Using outdated or vulnerable software components that have known security issues."
    },
    {
      id: 7,
      title: "Authentication Failures",
      icon: <Key className="w-12 h-12 text-red-500" />,
      visual: (
        <div className="bg-slate-100 p-4 rounded-lg">
          <div className="space-y-2">
            <div className="text-xs text-center mb-2">Brute Force Attack</div>
            <div className="space-y-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-1 rounded border border-red-500">
                  <div className="font-mono text-xs">
                    Login attempt {i}: admin/password{i}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs text-center">. . .</div>
            <div className="text-xs text-center text-red-500">
              10,000+ attempts
            </div>
          </div>
        </div>
      ),
      description: "Weak authentication mechanisms that can be bypassed through brute force or other attacks."
    },
    {
      id: 8,
      title: "Software Integrity Failures",
      icon: <RefreshCw className="w-12 h-12 text-red-500" />,
      visual: (
        <div className="bg-slate-100 p-4 rounded-lg">
          <div className="space-y-2">
            <div className="bg-white p-2 rounded border border-gray-300">
              <div className="text-sm">Software Update</div>
              <div className="text-xs text-gray-600">app-update.exe</div>
              <div className="text-xs text-red-500">⚠️ Unsigned Package</div>
            </div>
            <div className="flex justify-center">
              <div className="bg-red-100 p-2 rounded-lg">
                <div className="text-xs text-red-500">Contains Malware!</div>
              </div>
            </div>
          </div>
        </div>
      ),
      description: "Compromised software updates or dependencies that introduce malicious code."
    },
    {
      id: 9,
      title: "Logging Failures",
      icon: <LineChart className="w-12 h-12 text-red-500" />,
      visual: (
        <div className="bg-slate-100 p-4 rounded-lg">
          <div className="space-y-2">
            <div className="bg-white p-2 rounded border border-gray-300">
              <div className="text-sm">System Logs</div>
              <div className="font-mono text-xs text-gray-400">No entries found</div>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <div className="text-red-500">⚠️</div>
              <div className="text-xs">Breach detected after 200 days</div>
            </div>
          </div>
        </div>
      ),
      description: "Insufficient logging and monitoring that allows attacks to go undetected for long periods."
    },
    {
      id: 10,
      title: "SSRF",
      icon: <Globe className="w-12 h-12 text-red-500" />,
      visual: (
        <div className="bg-slate-100 p-4 rounded-lg">
          <div className="space-y-2">
            <div className="bg-white p-2 rounded border border-red-500">
              <div className="text-sm">Malicious Request</div>
              <div className="font-mono text-xs">
                GET internal-api.local/secret-data
              </div>
            </div>
            <div className="bg-white p-2 rounded border border-gray-300">
              <div className="text-sm">Server Response</div>
              <div className="font-mono text-xs text-red-500">
                {`{
  "api_key": "****",
  "internal_data": "****"
}`}
              </div>
            </div>
          </div>
        </div>
      ),
      description: "Server processes untrusted URLs, allowing attackers to access internal resources."
    }
  ];

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>OWASP Top 10 Visual Guide</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vulnerabilities.map((vuln) => (
            <div
              key={vuln.id}
              className="bg-white p-4 rounded-lg border hover:border-blue-500 cursor-pointer transition-colors"
              onClick={() => setActiveVulnerability(activeVulnerability === vuln.id ? null : vuln.id)}
            >
              <div className="flex items-center space-x-4 mb-4">
                {vuln.icon}
                <div>
                  <div className="font-medium">{vuln.title}</div>
                  <div className="text-sm text-gray-600">#{vuln.id}</div>
                </div>
              </div>
              
              {activeVulnerability === vuln.id && (
                <div className="space-y-4">
                  {vuln.visual}
                  <p className="text-sm text-gray-600 mt-2">{vuln.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OWASPVisualGuide;