import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb, Check, RotateCcw, Code, Trophy, Target, User, X, Calendar, Award, TrendingUp } from 'lucide-react';

const CodingDebugQuiz = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [score, setScore] = useState(0);
  const [showProfile, setShowProfile] = useState(false);

  // Mock user profile data
  const userProfile = {
    name: "APG",
    email: "apg@gmail.com",
    joinDate: "March 2024",
    totalChallenges: 47,
    totalScore: 42,
    languages: ["Python", "JavaScript", "C++", "Java"],
    achievements: [
      { name: "First Debug", description: "Complete your first challenge", earned: true },
      { name: "Language Explorer", description: "Try all 4 languages", earned: true },
      { name: "Perfect Score", description: "Score 100% in any language", earned: false },
      { name: "Debug Master", description: "Complete 50 challenges", earned: false }
    ],
    recentActivity: [
      { language: "Python", score: "5/5", date: "Today" },
    ]
  };

  const questions = {
    python: [
      {
        id: 1,
        title: "Print Statement Syntax Error",
        buggyCode: `print "Hello World"`,
        correctCode: `print("Hello World")`,
        hint: "In Python 3, print is a function and requires parentheses.",
        description: "Fix the print statement syntax error."
      },
      {
        id: 2,
        title: "Indentation Error",
        buggyCode: `if True:
print("This is indented correctly")
print("This is not indented correctly")`,
        correctCode: `if True:
    print("This is indented correctly")
    print("This is not indented correctly")`,
        hint: "Python uses indentation to define code blocks. All statements in the same block must have the same indentation level.",
        description: "Fix the indentation error in this if statement."
      },
      {
        id: 3,
        title: "Variable Name Error",
        buggyCode: `my-variable = 10
print(my-variable)`,
        correctCode: `my_variable = 10
print(my_variable)`,
        hint: "Variable names in Python cannot contain hyphens. Use underscores instead.",
        description: "Fix the variable naming error."
      },
      {
        id: 4,
        title: "String Concatenation Error",
        buggyCode: `name = "Alice"
age = 25
print("My name is " + name + " and I am " + age + " years old")`,
        correctCode: `name = "Alice"
age = 25
print("My name is " + name + " and I am " + str(age) + " years old")`,
        hint: "You cannot concatenate strings with integers directly. Convert the integer to string using str().",
        description: "Fix the string concatenation error."
      },
      {
        id: 5,
        title: "List Index Error",
        buggyCode: `numbers = [1, 2, 3]
print(numbers[3])`,
        correctCode: `numbers = [1, 2, 3]
print(numbers[2])`,
        hint: "List indices start from 0. The last element of a 3-element list is at index 2.",
        description: "Fix the list indexing error."
      }
    ],
    c: [
      {
        id: 1,
        title: "Missing Semicolon",
        buggyCode: `#include <stdio.h>
int main() {
    printf("Hello World")
    return 0;
}`,
        correctCode: `#include <stdio.h>
int main() {
    printf("Hello World");
    return 0;
}`,
        hint: "Every statement in C must end with a semicolon (;).",
        description: "Fix the missing semicolon error."
      },
      {
        id: 2,
        title: "Missing Return Type",
        buggyCode: `#include <stdio.h>
main() {
    printf("Hello World");
    return 0;
}`,
        correctCode: `#include <stdio.h>
int main() {
    printf("Hello World");
    return 0;
}`,
        hint: "The main function should have a return type, typically 'int'.",
        description: "Fix the missing return type for main function."
      },
      {
        id: 3,
        title: "Array Index Out of Bounds",
        buggyCode: `#include <stdio.h>
int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    printf("%d", arr[5]);
    return 0;
}`,
        correctCode: `#include <stdio.h>
int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    printf("%d", arr[4]);
    return 0;
}`,
        hint: "Array indices start from 0. A 5-element array has indices 0-4.",
        description: "Fix the array index out of bounds error."
      },
      {
        id: 4,
        title: "Wrong Format Specifier",
        buggyCode: `#include <stdio.h>
int main() {
    float num = 3.14;
    printf("Value: %d", num);
    return 0;
}`,
        correctCode: `#include <stdio.h>
int main() {
    float num = 3.14;
    printf("Value: %f", num);
    return 0;
}`,
        hint: "Use %f for float values, not %d (which is for integers).",
        description: "Fix the format specifier error."
      },
      {
        id: 5,
        title: "Assignment vs Comparison",
        buggyCode: `#include <stdio.h>
int main() {
    int x = 5;
    if (x = 10) {
        printf("x is 10");
    }
    return 0;
}`,
        correctCode: `#include <stdio.h>
int main() {
    int x = 5;
    if (x == 10) {
        printf("x is 10");
    }
    return 0;
}`,
        hint: "Use == for comparison, not = (which is for assignment).",
        description: "Fix the assignment vs comparison error."
      }
    ],
    "c++": [
      {
        id: 1,
        title: "Missing Namespace",
        buggyCode: `#include <iostream>
int main() {
    cout << "Hello World";
    return 0;
}`,
        correctCode: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello World";
    return 0;
}`,
        hint: "Add 'using namespace std;' or use 'std::cout' to access cout.",
        description: "Fix the missing namespace error."
      },
      {
        id: 2,
        title: "Missing Semicolon",
        buggyCode: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello World"
    return 0;
}`,
        correctCode: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello World";
    return 0;
}`,
        hint: "Every statement in C++ must end with a semicolon (;).",
        description: "Fix the missing semicolon error."
      },
      {
        id: 3,
        title: "Reference Initialization Error",
        buggyCode: `#include <iostream>
using namespace std;
int main() {
    int &ref;
    int x = 10;
    ref = x;
    cout << ref;
    return 0;
}`,
        correctCode: `#include <iostream>
using namespace std;
int main() {
    int x = 10;
    int &ref = x;
    cout << ref;
    return 0;
}`,
        hint: "References must be initialized when declared.",
        description: "Fix the reference initialization error."
      },
      {
        id: 4,
        title: "Array Declaration Error",
        buggyCode: `#include <iostream>
using namespace std;
int main() {
    int n = 5;
    int arr[n];
    cout << "Array created";
    return 0;
}`,
        correctCode: `#include <iostream>
using namespace std;
int main() {
    const int n = 5;
    int arr[n];
    cout << "Array created";
    return 0;
}`,
        hint: "Array size must be a compile-time constant.",
        description: "Fix the variable array size error."
      },
      {
        id: 5,
        title: "Memory Leak Error",
        buggyCode: `#include <iostream>
using namespace std;
int main() {
    int *ptr = new int(10);
    cout << "Value: " << *ptr;
    return 0;
}`,
        correctCode: `#include <iostream>
using namespace std;
int main() {
    int *ptr = new int(10);
    cout << "Value: " << *ptr;
    delete ptr;
    return 0;
}`,
        hint: "Always delete dynamically allocated memory using 'delete'.",
        description: "Fix the memory leak by adding delete."
      }
    ],
    java: [
      {
        id: 1,
        title: "Missing Class Declaration",
        buggyCode: `public static void main(String[] args) {
    System.out.println("Hello World");
}`,
        correctCode: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
        hint: "Java code must be inside a class. Create a public class to contain the main method.",
        description: "Fix the missing class declaration error."
      },
      {
        id: 2,
        title: "Missing Semicolon",
        buggyCode: `public class Test {
    public static void main(String[] args) {
        System.out.println("Hello World")
    }
}`,
        correctCode: `public class Test {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
        hint: "Every statement in Java must end with a semicolon (;).",
        description: "Fix the missing semicolon error."
      },
      {
        id: 3,
        title: "Array Index Out of Bounds",
        buggyCode: `public class Test {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        System.out.println(arr[5]);
    }
}`,
        correctCode: `public class Test {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        System.out.println(arr[4]);
    }
}`,
        hint: "Array indices start from 0. A 5-element array has indices 0-4.",
        description: "Fix the array index out of bounds error."
      },
      {
        id: 4,
        title: "Variable Not Initialized",
        buggyCode: `public class Test {
    public static void main(String[] args) {
        int x;
        System.out.println("Value: " + x);
    }
}`,
        correctCode: `public class Test {
    public static void main(String[] args) {
        int x = 0;
        System.out.println("Value: " + x);
    }
}`,
        hint: "Local variables must be initialized before use in Java.",
        description: "Fix the uninitialized variable error."
      },
      {
        id: 5,
        title: "Method Return Type Error",
        buggyCode: `public class Test {
    public static void calculate() {
        int result = 10 + 5;
        return result;
    }
    public static void main(String[] args) {
        int value = calculate();
        System.out.println(value);
    }
}`,
        correctCode: `public class Test {
    public static int calculate() {
        int result = 10 + 5;
        return result;
    }
    public static void main(String[] args) {
        int value = calculate();
        System.out.println(value);
    }
}`,
        hint: "Methods that return a value must specify the return type (int, String, etc.).",
        description: "Fix the method return type error."
      }
    ]
  };

  const languages = [
    { id: 'python', name: 'Python', icon: '🐍', color: 'bg-emerald-500' },
    { id: 'c', name: 'C', icon: '⚡', color: 'bg-cyan-500' },
    { id: 'c++', name: 'C++', icon: '🔧', color: 'bg-orange-500' },
    { id: 'java', name: 'Java', icon: '☕', color: 'bg-rose-500' }
  ];

  const currentQuestions = selectedLanguage ? questions[selectedLanguage] : [];
  const currentQuestionData = currentQuestions[currentQuestion];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setCurrentQuestion(0);
    setUserCode(questions[language][0]?.buggyCode || '');
    setShowHint(false);
    setShowSuccess(false);
    setCompletedQuestions(new Set());
    setScore(0);
  };

  const checkAnswer = () => {
    if (!currentQuestionData) return;
    
    const userCodeTrimmed = userCode.trim().replace(/\s+/g, ' ');
    const correctCodeTrimmed = currentQuestionData.correctCode.trim().replace(/\s+/g, ' ');
    
    if (userCodeTrimmed === correctCodeTrimmed) {
      setShowSuccess(true);
      const newCompleted = new Set(completedQuestions);
      if (!newCompleted.has(currentQuestion)) {
        newCompleted.add(currentQuestion);
        setCompletedQuestions(newCompleted);
        setScore(score + 1);
      }
      setTimeout(() => setShowSuccess(false), 2000);
    } else {
      alert("Not quite right! Check the hint if you need help.");
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      const nextQ = currentQuestion + 1;
      setCurrentQuestion(nextQ);
      setUserCode(currentQuestions[nextQ].buggyCode);
      setShowHint(false);
      setShowSuccess(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      const prevQ = currentQuestion - 1;
      setCurrentQuestion(prevQ);
      setUserCode(currentQuestions[prevQ].buggyCode);
      setShowHint(false);
      setShowSuccess(false);
    }
  };

  const resetCode = () => {
    if (currentQuestionData) {
      setUserCode(currentQuestionData.buggyCode);
      setShowSuccess(false);
    }
  };

  // Profile Modal Component
  const ProfileModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-teal-500/30">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Profile</h2>
          <button
            onClick={() => setShowProfile(false)}
            className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 transition-colors"
          >
            <X className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center mb-8 p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{userProfile.name}</h3>
            <p className="text-slate-300">{userProfile.email}</p>
            <div className="flex items-center text-sm text-slate-400 mt-1">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Joined {userProfile.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
            <div className="flex items-center mb-2">
              <TrendingUp className="w-5 h-5 text-teal-400 mr-2" />
              <span className="text-slate-300">Total Challenges</span>
            </div>
            <div className="text-2xl font-bold text-white">{userProfile.totalChallenges}</div>
          </div>
          <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
            <div className="flex items-center mb-2">
              <Trophy className="w-5 h-5 text-amber-400 mr-2" />
              <span className="text-slate-300">Total Score</span>
            </div>
            <div className="text-2xl font-bold text-white">{userProfile.totalScore}</div>
          </div>
        </div>

        {/* Languages */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-white mb-3">Languages Practiced</h4>
          <div className="flex flex-wrap gap-2">
            {userProfile.languages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm border border-teal-500/30"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-white mb-3">Achievements</h4>
          <div className="space-y-3">
            {userProfile.achievements.map((achievement, index) => (
              <div
                key={index}
                className={`flex items-center p-3 rounded-lg border ${
                  achievement.earned
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-slate-700/30 border-slate-600/30'
                }`}
              >
                <Award className={`w-5 h-5 mr-3 ${
                  achievement.earned ? 'text-emerald-400' : 'text-slate-500'
                }`} />
                <div>
                  <div className={`font-medium ${
                    achievement.earned ? 'text-emerald-300' : 'text-slate-400'
                  }`}>
                    {achievement.name}
                  </div>
                  <div className="text-sm text-slate-400">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Recent Activity</h4>
          <div className="space-y-2">
            {userProfile.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
                <div className="flex items-center">
                  <Code className="w-4 h-4 text-teal-400 mr-2" />
                  <span className="text-white">{activity.language}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-teal-300 font-medium">{activity.score}</span>
                  <span className="text-slate-400 text-sm">{activity.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (!selectedLanguage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-900 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header with Profile Button */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center">
              <Code className="w-12 h-12 text-teal-400 mr-4" />
              <div>
                <h1 className="text-5xl font-bold text-white">Debug Master</h1>
                <p className="text-xl text-slate-300 mt-2">
                  Test your debugging skills! Find and fix code errors across different programming languages.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowProfile(true)}
              className="flex items-center px-4 py-2 bg-slate-800/40 hover:bg-slate-700/50 backdrop-blur-sm rounded-xl border border-teal-500/30 transition-colors"
            >
              <User className="w-5 h-5 text-teal-300 mr-2" />
              <span className="text-white font-medium">Profile</span>
            </button>
          </div>

          {/* Language Selection */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => handleLanguageSelect(lang.id)}
                className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-teal-500/30 p-8 hover:bg-white/10 hover:border-teal-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{lang.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{lang.name}</h3>
                  <p className="text-slate-300 text-sm">5 Debugging Challenges</p>
                </div>
              </button>
            ))}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6">
              <Target className="w-12 h-12 text-teal-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Real Code Bugs</h3>
              <p className="text-slate-300">Practice with authentic programming errors</p>
            </div>
            <div className="text-center p-6">
              <Lightbulb className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Helpful Hints</h3>
              <p className="text-slate-300">Get guidance when you're stuck</p>
            </div>
            <div className="text-center p-6">
              <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Track Progress</h3>
              <p className="text-slate-300">Monitor your debugging improvement</p>
            </div>
          </div>
        </div>

        {/* Profile Modal */}
        {showProfile && <ProfileModal />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-teal-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Profile Button */}
        <div className="flex items-center justify-between mb-8 bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-teal-500/30">
          <div className="flex items-center">
            <button
              onClick={() => setSelectedLanguage('')}
              className="mr-4 p-2 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-teal-300" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {languages.find(l => l.id === selectedLanguage)?.name} Debug Challenge
              </h1>
              <p className="text-slate-300">Question {currentQuestion + 1} of {currentQuestions.length}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-slate-300">Score</div>
              <div className="text-2xl font-bold text-teal-300">{score}/{currentQuestions.length}</div>
            </div>
            <button
              onClick={() => setShowProfile(true)}
              className="flex items-center px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 backdrop-blur-sm rounded-lg border border-slate-600/50 transition-colors"
            >
              <User className="w-5 h-5 text-teal-300 mr-2" />
              <span className="text-white font-medium">Profile</span>
            </button>
          </div>
        </div>

        {currentQuestionData && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Question Panel */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-teal-500/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">{currentQuestionData.title}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  completedQuestions.has(currentQuestion) ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-slate-900'
                }`}>
                  {completedQuestions.has(currentQuestion) ? 'Completed' : 'In Progress'}
                </span>
              </div>
              
              <p className="text-slate-300 mb-6">{currentQuestionData.description}</p>

              {/* Hint Section */}
              <div className="mb-6">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded-lg transition-colors"
                >
                  <Lightbulb className="w-4 h-4 mr-2 text-amber-400" />
                  <span className="text-amber-300">Show Hint</span>
                </button>
                
                {showHint && (
                  <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <p className="text-amber-200">{currentQuestionData.hint}</p>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="flex items-center px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-600/50 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  <span className="text-slate-200">Previous</span>
                </button>
                
                <button
                  onClick={nextQuestion}
                  disabled={currentQuestion === currentQuestions.length - 1}
                  className="flex items-center px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-600/50 rounded-lg transition-colors"
                >
                  <span className="text-slate-200">Next</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>

            {/* Code Editor Panel */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-teal-500/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Fix the Code</h3>
                <div className="space-x-2">
                  <button
                    onClick={resetCode}
                    className="px-3 py-1 bg-slate-600/30 hover:bg-slate-600/50 border border-slate-500/40 rounded text-slate-300 text-sm transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 inline mr-1" />
                    Reset
                  </button>
                </div>
              </div>

              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full h-64 bg-slate-900/60 border border-slate-600/50 rounded-lg p-4 text-slate-100 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Fix the code here..."
              />

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={checkAnswer}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors flex items-center shadow-lg shadow-emerald-500/25"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Check Solution
                </button>

                {showSuccess && (
                  <div className="flex items-center text-emerald-400 animate-pulse">
                    <Check className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Correct! Well done!</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-slate-300 mb-2">
                  <span>Progress</span>
                  <span>{completedQuestions.size}/{currentQuestions.length}</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedQuestions.size / currentQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Completion Message */}
        {completedQuestions.size === currentQuestions.length && (
          <div className="mt-8 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-xl p-8 border border-emerald-500/30 text-center">
            <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">Congratulations! 🎉</h2>
            <p className="text-slate-300 text-lg">
              You've completed all {currentQuestions.length} debugging challenges in {languages.find(l => l.id === selectedLanguage)?.name}!
            </p>
            <p className="text-2xl font-semibold text-emerald-400 mt-4">Final Score: {score}/{currentQuestions.length}</p>
            <button
              onClick={() => setSelectedLanguage('')}
              className="mt-6 px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-teal-500/25"
            >
              Try Another Language
            </button>
          </div>
        )}

        {/* Profile Modal */}
        {showProfile && <ProfileModal />}
      </div>
    </div>
  );
};

export default CodingDebugQuiz;