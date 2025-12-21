"use client";

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PasswordCriteria {
  id: string;
  label: string;
  regex: RegExp;
  met: boolean;
}

interface StrengthLevel {
  label: string;
  color: string;
  bgColor: string;
  score: number;
}

const strengthLevels: StrengthLevel[] = [
  { label: "Very Weak", color: "text-red-600", bgColor: "bg-red-500", score: 0 },
  { label: "Weak", color: "text-orange-600", bgColor: "bg-orange-500", score: 25 },
  { label: "Fair", color: "text-yellow-600", bgColor: "bg-yellow-500", score: 50 },
  { label: "Good", color: "text-blue-600", bgColor: "bg-blue-500", score: 75 },
  { label: "Strong", color: "text-green-600", bgColor: "bg-green-500", score: 100 },
];

export function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [strengthLevel, setStrengthLevel] = useState(strengthLevels[0]);

  const [criteria, setCriteria] = useState<PasswordCriteria[]>([
    {
      id: "length",
      label: "At least 8 characters",
      regex: /.{8,}/,
      met: false,
    },
    {
      id: "lowercase",
      label: "Contains lowercase letter",
      regex: /[a-z]/,
      met: false,
    },
    {
      id: "uppercase",
      label: "Contains uppercase letter",
      regex: /[A-Z]/,
      met: false,
    },
    {
      id: "number",
      label: "Contains number",
      regex: /\d/,
      met: false,
    },
    {
      id: "special",
      label: "Contains special character",
      regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      met: false,
    },
    {
      id: "noCommon",
      label: "Not a common password",
      regex: /^(?!.*(password|123456|qwerty|abc123|letmein|welcome|admin|user)).*$/i,
      met: false,
    },
  ]);

  const commonPasswords = [
    "password", "123456", "password123", "admin", "qwerty",
    "letmein", "welcome", "monkey", "1234567890", "abc123"
  ];

  useEffect(() => {
    if (!password) {
      setCriteria(prev => prev.map(c => ({ ...c, met: false })));
      setStrength(0);
      setStrengthLevel(strengthLevels[0]);
      return;
    }

    // Update criteria
    const updatedCriteria = criteria.map(criterion => ({
      ...criterion,
      met: criterion.regex.test(password)
    }));

    setCriteria(updatedCriteria);

    // Calculate strength score
    const metCriteria = updatedCriteria.filter(c => c.met).length;
    const baseScore = (metCriteria / criteria.length) * 100;
    
    // Bonus points for length
    let lengthBonus = 0;
    if (password.length > 12) lengthBonus = 10;
    else if (password.length > 16) lengthBonus = 20;

    // Penalty for common patterns
    let penalty = 0;
    if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
      penalty = 30;
    }
    if (/(.)\1{2,}/.test(password)) penalty += 15; // Repeated characters
    if (/123|abc|qwe/i.test(password)) penalty += 10; // Sequential patterns

    const finalScore = Math.max(0, Math.min(100, baseScore + lengthBonus - penalty));
    setStrength(finalScore);

    // Determine strength level
    if (finalScore >= 90) setStrengthLevel(strengthLevels[4]);
    else if (finalScore >= 70) setStrengthLevel(strengthLevels[3]);
    else if (finalScore >= 50) setStrengthLevel(strengthLevels[2]);
    else if (finalScore >= 25) setStrengthLevel(strengthLevels[1]);
    else setStrengthLevel(strengthLevels[0]);

  }, [password]);

  const getStrengthIcon = () => {
    if (strength >= 75) return <Shield className="h-5 w-5 text-green-600" />;
    if (strength >= 50) return <CheckCircle className="h-5 w-5 text-blue-600" />;
    if (strength >= 25) return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  const generateStrongPassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    let password = "";
    const length = 12 + Math.floor(Math.random() * 4); // 12-15 characters
    
    // Ensure at least one character from each category
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += special[Math.floor(Math.random() * special.length)];
    
    // Fill the rest randomly
    const allChars = lowercase + uppercase + numbers + special;
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Shuffle the password
    const shuffled = password.split('').sort(() => Math.random() - 0.5).join('');
    setPassword(shuffled);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          Password Strength Checker
        </CardTitle>
        <CardDescription>
          Test your password strength and get real-time feedback on security
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Password Input */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Enter Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your password here..."
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Generate Password Button */}
        <Button 
          onClick={generateStrongPassword}
          variant="outline"
          className="w-full"
        >
          Generate Strong Password
        </Button>

        {/* Strength Indicator */}
        {password && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStrengthIcon()}
                <span className={`font-semibold ${strengthLevel.color}`}>
                  {strengthLevel.label}
                </span>
              </div>
              <Badge variant="outline">
                {Math.round(strength)}% Secure
              </Badge>
            </div>
            
            <Progress 
              value={strength} 
              className="h-3"
            />
            
            <div className="flex gap-1">
              {strengthLevels.map((level, index) => (
                <div
                  key={level.label}
                  className={`h-2 flex-1 rounded-sm transition-colors ${
                    strength >= level.score ? level.bgColor : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Criteria Checklist */}
        {password && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Password Requirements:</h4>
            <div className="grid gap-2">
              {criteria.map((criterion) => (
                <div
                  key={criterion.id}
                  className={`flex items-center gap-2 text-sm p-2 rounded-md transition-colors ${
                    criterion.met 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {criterion.met ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span>{criterion.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h4 className="font-semibold text-blue-900 mb-2">💡 Security Tips:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use a unique password for each account</li>
            <li>• Consider using a password manager</li>
            <li>• Enable two-factor authentication when possible</li>
            <li>• Avoid personal information in passwords</li>
            <li>• Update passwords regularly for sensitive accounts</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}