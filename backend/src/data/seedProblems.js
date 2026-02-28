// Sample seed data for Problems collection
export const seedProblems = [
  {
    id: "two-sum",
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Algorithms",
    tags: ["Arrays", "Hash Table"],
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      notes: ["Only one valid answer exists.", "The return order doesn't matter."],
    },
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"],
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9" },
    ],
    starterCode: {
      javascript: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};",
      python: "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        pass",
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
    category: "Algorithms",
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
      javascript: "/**\n * @param {character[]} s\n * @return {void} Do not return anything, modify s in-place instead.\n */\nvar reverseString = function(s) {\n    \n};",
      python: "class Solution:\n    def reverseString(self, s: List[str]) -> None:\n        \"\"\"\n        Do not return anything, modify s in-place instead.\n        \"\"\"\n        pass",
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
    category: "Algorithms",
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
      javascript: "/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    \n};",
      python: "class Solution:\n    def isValid(self, s: str) -> bool:\n        pass",
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
    category: "Algorithms",
    tags: ["Arrays", "Dynamic Programming"],
    description: {
      text: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      notes: ["A subarray is a contiguous part of an array."],
    },
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "[4,-1,2,1] has the largest sum 6" },
    ],
    starterCode: {
      javascript: "/**\n * @param {number[]} nums\n * @return {number}\n */\nvar maxSubArray = function(nums) {\n    \n};",
      python: "class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        pass",
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
    id: "word-ladder",
    slug: "word-ladder",
    title: "Word Ladder",
    difficulty: "Hard",
    category: "Algorithms",
    tags: ["BFS", "Graphs"],
    description: {
      text: "Given two words, beginWord and endWord, and a dictionary's word list, return the length of shortest transformation sequence from beginWord to endWord.",
      notes: ["Return 0 if there is no such transformation sequence."],
    },
    constraints: ["1 <= beginWord.length <= 10", "1 <= endWord.length <= 10", "1 <= wordList.length <= 5000"],
    examples: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: "5" },
    ],
    starterCode: {
      javascript: "/**\n * @param {string} beginWord\n * @param {string} endWord\n * @param {string[]} wordList\n * @return {number}\n */\nvar ladderLength = function(beginWord, endWord, wordList) {\n    \n};",
      python: "class Solution:\n    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:\n        pass",
    },
    visibleTestCases: [
      { input: '"hit", "cog", ["hot","dot","dog","lot","log","cog"]', output: "5" },
    ],
    hiddenTestCases: [
      { input: '"hit", "cog", ["hot","dot","dog","lot","log"]', output: "0" },
    ],
    acceptanceRate: 28.9,
  },
];
