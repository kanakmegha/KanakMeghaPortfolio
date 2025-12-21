"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PasswordStrengthChecker } from "./password-strength-checker";
import { Code, Shield, Zap, Lightbulb } from "lucide-react";

export function ToolsDemoSection() {
  const [activeDemo, setActiveDemo] = useState("password-checker");

  const demos = [
    {
      id: "password-checker",
      title: "Password Strength Checker",
      description: "Real-time password validation with security feedback",
      icon: Shield,
      tags: ["Security", "Validation", "UX"],
      component: <PasswordStrengthChecker />,
      features: [
        "Real-time strength analysis",
        "Regex pattern validation", 
        "Visual feedback with progress bars",
        "Security recommendations",
        "Password generation"
      ]
    }
  ];

  return (
    <section id="tools-demo" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                Interactive Tools & Demos
              </h2>
            </div>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Experience my frontend development skills through interactive demonstrations of security tools, 
              form validation, and user experience design.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl">
          <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-1 mb-8">
              {demos.map((demo) => {
                const IconComponent = demo.icon;
                return (
                  <TabsTrigger
                    key={demo.id}
                    value={demo.id}
                    className="flex items-center gap-2 p-4 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-semibold">{demo.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {demos.map((demo) => (
              <TabsContent key={demo.id} value={demo.id} className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-3">
                  {/* Demo Description */}
                  <div className="lg:col-span-1 space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <demo.icon className="h-6 w-6 text-blue-600" />
                          {demo.title}
                        </CardTitle>
                        <CardDescription>{demo.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Lightbulb className="h-4 w-4" />
                              Key Features:
                            </h4>
                            <ul className="text-sm space-y-1">
                              {demo.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <div className="h-1.5 w-1.5 bg-blue-600 rounded-full" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Code className="h-4 w-4" />
                              Technologies:
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {demo.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                              💻 What This Demonstrates:
                            </h4>
                            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                              <li>• Advanced form validation techniques</li>
                              <li>• Real-time user feedback systems</li>
                              <li>• Security-focused development</li>
                              <li>• Interactive UI/UX design</li>
                              <li>• Modern React patterns & hooks</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Live Demo */}
                  <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border shadow-lg">
                      <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                        <div className="flex gap-2">
                          <div className="h-3 w-3 bg-red-400 rounded-full"></div>
                          <div className="h-3 w-3 bg-yellow-400 rounded-full"></div>
                          <div className="h-3 w-3 bg-green-400 rounded-full"></div>
                        </div>
                        <span className="text-sm text-gray-500 ml-2">Live Demo</span>
                      </div>
                      {demo.component}
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl inline-block">
            <h3 className="font-bold text-lg mb-2">Impressed by the Interactive Demo?</h3>
            <p className="text-blue-100 mb-4">
              This showcases my ability to create engaging, functional user interfaces with real-world applications.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                React Hooks
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                TypeScript
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Form Validation
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Security Focus
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}