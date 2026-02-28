// Seed data for coding problems
export const PROBLEMS = [
  {
    id: "two-sum",
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    tags: ["Arrays", "Hash Table"],
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
      notes: ["You may assume that each input would have exactly one solution.", "You may not use the same element twice.", "You can return the answer in any order."],
    },
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9", "Only one valid answer exists"],
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
    ],
    starterCode: {
      javascript: "function twoSum(nums, target) {\n  // Write your solution here\n}",
      python: "def twoSum(nums, target):\n    # Write your solution here\n    pass",
    },
    visibleTestCases: [
      { input: "[2,7,11,15], 9", output: "[0,1]" },
    ],
    hiddenTestCases: [
      { input: "[3,2,4], 6", output: "[1,2]" },
      { input: "[3,3], 6", output: "[0,1]" },
    ],
    acceptanceRate: 48.7,
  },
  {
    id: "reverse-string",
    slug: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String",
    tags: ["Strings", "Two Pointers"],
    description: {
      text: "Write a function that reverses a string. The input string is given as an array of characters s.",
      notes: ["Do not allocate extra space for another array.", "You must do this by modifying the input array in-place with O(1) extra memory."],
    },
    constraints: ["1 <= s.length <= 10^5", "s[i] is a printable ascii character"],
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
    ],
    starterCode: {
      javascript: "function reverseString(s) {\n  // Write your solution here\n}",
      python: "def reverseString(s):\n    # Write your solution here\n    pass",
    },
    visibleTestCases: [
      { input: '["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
    ],
    hiddenTestCases: [
      { input: '["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' },
    ],
    acceptanceRate: 77.1,
  },
  {
    id: "valid-parentheses",
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    tags: ["Stack", "Strings"],
    description: {
      text: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      notes: ["Open brackets must be closed by the same type of brackets.", "Open brackets must be closed in the correct order."],
    },
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'"],
    examples: [
      { input: 's = "()"', output: "true" },
    ],
    starterCode: {
      javascript: "function isValid(s) {\n  // Write your solution here\n}",
      python: "def isValid(s):\n    # Write your solution here\n    pass",
    },
    visibleTestCases: [
      { input: '"()"', output: "true" },
    ],
    hiddenTestCases: [
      { input: '"()[]{}"', output: "true" },
      { input: '"(]"', output: "false" },
    ],
    acceptanceRate: 42.3,
  },
  {
    id: "maximum-subarray",
    slug: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Array",
    tags: ["Arrays", "Dynamic Programming"],
    description: {
      text: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      notes: ["A subarray is a contiguous part of an array."],
    },
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
    ],
    starterCode: {
      javascript: "function maxSubArray(nums) {\n  // Write your solution here\n}",
      python: "def maxSubArray(nums):\n    # Write your solution here\n    pass",
    },
    visibleTestCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
    ],
    hiddenTestCases: [
      { input: "[1]", output: "1" },
      { input: "[5,4,-1,7,8]", output: "23" },
    ],
    acceptanceRate: 51.2,
  },
  {
    id: "container-with-most-water",
    slug: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Array",
    tags: ["Arrays", "Two Pointers"],
    description: {
      text: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).",
      notes: ["Find two lines that together with the x-axis form a container, such that the container contains the most water.", "Return the maximum amount of water a container can store."],
    },
    constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    examples: [
      { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
    ],
    starterCode: {
      javascript: "function maxArea(height) {\n  // Write your solution here\n}",
      python: "def maxArea(height):\n    # Write your solution here\n    pass",
    },
    visibleTestCases: [
      { input: "[1,8,6,2,5,4,8,3,7]", output: "49" },
    ],
    hiddenTestCases: [
      { input: "[1,1]", output: "1" },
    ],
    acceptanceRate: 54.1,
  },
];
