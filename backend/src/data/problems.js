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
      java: "import java.util.*;\n\npublic class Main {\n    public static int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[]{0, 1};\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {2, 7, 11, 15};\n        int target = 9;\n        int[] result = twoSum(nums, target);\n        System.out.println(Arrays.toString(result));\n    }\n}",
      c: "#include <stdio.h>\n#include <stdlib.h>\n\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Write your solution here\n    *returnSize = 2;\n    int* result = (int*)malloc(2 * sizeof(int));\n    result[0] = 0; result[1] = 1;\n    return result;\n}\n\nint main() {\n    int nums[] = {2, 7, 11, 15};\n    int target = 9;\n    int returnSize;\n    int* result = twoSum(nums, 4, target, &returnSize);\n    printf(\"[%d,%d]\\n\", result[0], result[1]);\n    free(result);\n    return 0;\n}",
      cpp: "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        return {0, 1};\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> nums = {2, 7, 11, 15};\n    int target = 9;\n    vector<int> result = sol.twoSum(nums, target);\n    cout << \"[\" << result[0] << \",\" << result[1] << \"]\" << endl;\n    return 0;\n}",
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
      java: "import java.util.*;\n\npublic class Main {\n    public static void reverseString(char[] s) {\n        // Write your solution here\n    }\n\n    public static void main(String[] args) {\n        char[] s = {'h', 'e', 'l', 'l', 'o'};\n        reverseString(s);\n        System.out.println(Arrays.toString(s));\n    }\n}",
      c: "#include <stdio.h>\n#include <string.h>\n\nvoid reverseString(char* s, int sSize) {\n    // Write your solution here\n}\n\nint main() {\n    char s[] = {'h', 'e', 'l', 'l', 'o'};\n    reverseString(s, 5);\n    printf(\"[\");\n    for(int i=0; i<5; i++) {\n        printf(\"\\\"%c\\\"%s\", s[i], i==4 ? \"\" : \",\");\n    }\n    printf(\"]\\n\");\n    return 0;\n}",
      cpp: "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        // Write your solution here\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<char> s = {'h', 'e', 'l', 'l', 'o'};\n    sol.reverseString(s);\n    cout << \"[\";\n    for(int i=0; i<s.size(); i++) {\n        cout << \"\\\"\" << s[i] << \"\\\"\" << (i==s.size()-1 ? \"\" : \",\");\n    }\n    cout << \"]\" << endl;\n    return 0;\n}",
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
      java: "import java.util.*;\n\npublic class Main {\n    public static boolean isValid(String s) {\n        // Write your solution here\n        return true;\n    }\n\n    public static void main(String[] args) {\n        String s = \"()\";\n        System.out.println(isValid(s));\n    }\n}",
      c: "#include <stdio.h>\n#include <stdbool.h>\n\nbool isValid(char* s) {\n    // Write your solution here\n    return true;\n}\n\nint main() {\n    char* s = \"()\";\n    printf(\"%s\\n\", isValid(s) ? \"true\" : \"false\");\n    return 0;\n}",
      cpp: "#include <iostream>\n#include <string>\n#include <stack>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        // Write your solution here\n        return true;\n    }\n};\n\nint main() {\n    Solution sol;\n    string s = \"()\";\n    cout << (sol.isValid(s) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
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
      java: "public class Main {\n    public static int maxSubArray(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n        System.out.println(maxSubArray(nums));\n    }\n}",
      c: "#include <stdio.h>\n\nint maxSubArray(int* nums, int numsSize) {\n    // Write your solution here\n    return 0;\n}\n\nint main() {\n    int nums[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n    printf(\"%d\\n\", maxSubArray(nums, 9));\n    return 0;\n}",
      cpp: "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};\n    cout << sol.maxSubArray(nums) << endl;\n    return 0;\n}",
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
      java: "public class Main {\n    public static int maxArea(int[] height) {\n        // Write your solution here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        int[] height = {1, 8, 6, 2, 5, 4, 8, 3, 7};\n        System.out.println(maxArea(height));\n    }\n}",
      c: "#include <stdio.h>\n\nint maxArea(int* height, int heightSize) {\n    // Write your solution here\n    return 0;\n}\n\nint main() {\n    int height[] = {1, 8, 6, 2, 5, 4, 8, 3, 7};\n    printf(\"%d\\n\", maxArea(height, 9));\n    return 0;\n}",
      cpp: "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        // Write your solution here\n        return 0;\n    }\n};\n\nint main() {\n    Solution sol;\n    vector<int> height = {1, 8, 6, 2, 5, 4, 8, 3, 7};\n    cout << sol.maxArea(height) << endl;\n    return 0;\n}",
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
