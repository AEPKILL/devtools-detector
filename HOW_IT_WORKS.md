# How it works

This document explains the technical principles behind detecting whether Chrome Developer Tools are open using JavaScript.

## Core Detection Mechanisms

The library primarily detects the Developer Tools state by observing subtle differences in `console.log` behavior when the tools are open versus closed. Currently, it implements three main detection approaches:

### 1. Type Serialization Detection (Deprecated)

In earlier versions of Chrome, Developer Tools would execute additional serialization methods for certain data types to improve data display. We leveraged this behavior:

- `date-to-string.checker.ts`: Utilizes Date object's toString method
- `function-to-string.checker.ts`: Utilizes Function object's toString method
- `reg-to-string.checker.ts`: Utilizes RegExp object's toString method
- `element-to-string.checker.ts`: Utilizes DocumentElement's id property access

> ⚠️ Note: Due to Chrome team's optimization of Developer Tools implementation, which now uses V8 API directly to fetch data, this approach no longer works in newer versions.
> I previously considered maintaining a browser version list to select different detection methods based on version, but ultimately decided against it due to high maintenance costs.

### 2. Performance Difference Detection (Currently Effective)

When printing large data structures (like massive arrays), Developer Tools behavior shows significant differences:

- Closed state: Only maintains references, doesn't create DOM nodes
- Open state: Creates complete DOM node trees

By measuring the execution time difference of `console.log`, we can accurately determine the Developer Tools state. `performance.checker.ts` implements this principle.

### 3. Debugger Detection (Fallback Solution)

Leverages behavioral differences of `debugger` statements:

- Open state: Interrupts code execution
- Closed state: Doesn't interrupt execution

By recording the time difference before and after the `debugger` statement, we can determine the Developer Tools state. `debugger-checker.ts` implements this approach.

> ⚠️ Note: This method significantly impacts user experience and can be easily bypassed, so it's only used as a fallback solution.

## Additional Detection Methods

- [devtoolsFormatters](https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview?tab=t.0#heading=h.xuvxhsd2bp05) requires users to manually enable the custom formatter feature (some Vue developers tend to enable this)

## How Were These Differences Discovered?

I initially discovered these techniques on StackOverflow. Curious about how they worked, I delved into the Chrome DevTools source code and uncovered these mechanisms.

If you're interested in these aspects, you can explore the source code at [devtools-frontend](https://github.com/ChromeDevTools/devtools-frontend/)

Interestingly, DevTools itself is a frontend application, and you can even debug DevTools directly through chrome://inspect.
