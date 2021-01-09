# Lab 10

### Due: Week 10, Sunday, 8:00 pm

### Value: 2 marks

## Overview

### Change Log

* Added 'If any school does not have a valid number for 2004 and 2018, you can ignore the school as a possibility.' to 1.
* Added 'If there are multiple schools that satisfy the condition, return the school that has smallest name lexicographically (i.e. highest in alphabet)'

### Aim

* Practice usage of javascript in the context of NodeJS

## Exercise

NSW has publically available data relating to the number of students (head count) at a number of high schools in NSW. They have this data for a range of years, including from 2004 to 2018.

This lab will be marked offline automatically, with a quick visual inspection of your code to ensure you haven't hard coded anything.

This data can be accessed in the file `HC.json`.

In `analytics.js`, you must implement the functions below. You can get the data for these questions by opening the `json` file in your repo.

### 1. `biggestGrowth`

Complete the function `biggestGrowth` such that it returns the name of
the school that has had the largest growth (increase) of students between 2004 and
2018 (i.e. find the school where difference between the 2018 HC and 2004
HC is the largest, ignoring anything that happened in years 2005-2017).

If there are multiple schools that satisfy the condition, return the school that has smallest name lexicographically (i.e. highest in alphabet)

If any school does not have a valid number for 2004 and 2018, you can ignore the school as a possibility.

### 2. `overallHeadCount`

Complete the function `overallHeadCount` such that it returns the name of the school that has the largest sum of all of the head counts across all of the years that the school lists for. This function returns a string.

If there are multiple schools that satisfy the condition, return the school that has smallest name lexicographically (i.e. highest in alphabet)

### (Challenge marks) 3. `largestVariation`

Complete the function `largestVariation` such that it returns the name of the school that has the largest variation in head count between adjacent years. E.G. If a school has a HC in 2005 of 78, and then a HC in 2006 of 88, then that is a variation of 10. It does not matter if the variation goes up or down. This function returns a string.

If there are multiple schools that satisfy the condition, return the school that has smallest name lexicographically (i.e. highest in alphabet)

## Submission Instructions

Your master branch will automatically submit itself at the due date listed at the top of this page. Once you have completed your work, you must ensure that your master branch (on gitlab) reflects the code that you want to have submitted.