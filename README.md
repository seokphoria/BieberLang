# BieberLang

## Overview

This programming language is based on Justin Bieber's hit song **"Baby"**, with more songs and artists coming soon!

BieberLang is a playful domain-specific language (DSL) where iconic lyrics are reimagined as programming constructs. Instead of writing traditional code, you write programs using song lyrics that map to variables, control flow, functions, and more.

---

## Language Concepts (Lyric → Meaning)

### Program Structure

```
Song: Baby
  ...
I thought you'd always be mine, mine
```

* Marks the **start and end of your program**
* Everything in between is executed

---

### Variables (Assignment)

```
Oh, woah, x is 5 ~
```

* Assigns a value to a variable
* Equivalent to: `x = 5`

---

### Printing (Output)

```
Just shout "Hello World", and I'll be there
```

* Prints output to the console
* Equivalent to: `print("Hello World")`

You can also print variables:

```
Just shout x, and I'll be there
```

---

### Increment

```
And x was like, baby, baby, ohh
```

* Increases a variable by the number of times "baby" appears
* Equivalent to: `x += 2`

---

### Decrement

```
Im going down, down
```

* Decreases a variable based on number of "down"s
* Equivalent to: `x -= 2`

---

### Loop (While-style)

```
When i < 10, I had my first love
  ...
And now my heart is breaking, but I just keep on saying
```

* Repeats block while condition is true
* Equivalent to:

```python
while i < 10:
    ...
```

---

### If / Elif / Else

```
Are we i == 0?
  ...
Girl quit playin, we're i == 1, what are you sayin?
  ...
Said, "Theres another," and looked right in my eyes
  ...
My first love broke my heart for the first time
```

* Conditional branching:

| Lyric                             | Meaning |
| --------------------------------- | ------- |
| `Are we ... ?`                    | if      |
| `Girl quit playin, we're ...`     | elif    |
| `Said, "Theres another,"...`      | else    |
| `My first love broke my heart...` | end if  |

---

### Expressions

```
Oh, for you, I would've done a + b
```

* Evaluates an expression (optional usage)
* Supports: `+ - * / %`

---

### Booleans

```
true
false
```

* Standard boolean values

---

### Methods (Functions)

#### Define a method:

```
Track MyMethod
  ...
End track
```

#### Call a method:

```
Play MyMethod ~
```

* Equivalent to:

```python
def MyMethod():
    ...

MyMethod()
```

---

## Quick Start

### 1. Install Requirements

Make sure you have Python installed, then install textX:

```bash
pip install textX
```

---

### 2. Run the Interpreter

Assuming your interpreter file is:

```
bieber_interpreter.py
```

Run:

```bash
python bieber_interpreter.py
```

---

### 3. Hello World Example

Create a file called `hello.jb`:

```
Song: Baby
  Just shout "Hello World", and I'll be there
I thought you'd always be mine, mine
```

Run it:

```bash
python bieber_interpreter.py hello.jb
```

Output:

```
Hello World
```

---

## Example: Simple Loop

```
Song: Baby
  Oh, woah, i is 0 ~

  When i < 3, I had my first love
    Just shout i, and I'll be there
    And i was like, baby, ohh
  And now my heart is breaking, but I just keep on saying

I thought you'd always be mine, mine
```

Output:

```
0
1
2
```

---

## Notes

* Statements may require `~` as a terminator depending on grammar
* Whitespace/newlines are ignored unless explicitly handled
* Variables are dynamically typed
* Methods must be defined before being called

---

## Future Features

* More songs & artists
* Arrays and collections
* Randomization (`Switch it up from X to Y!`)
* Advanced functions
