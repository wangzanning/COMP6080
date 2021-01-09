Student Name: Zanning Wang			zID: z5224151

Student Name: Weizhou Ren			  zID: z5288155

# Testing

The user stored in database who has plenty data is 
```
email: 'asd@unsw.edu.au';
password: = 'asd';
```

which you can login to see the games and questions and conduct manual testing.


## Component Testing
There are three components which are conducted test by Jest and Enzyme including ```AnswerInputs```, ```GameCard``` and ```Model```. Each component is tested to match snapshot, render props and componnets correctly and can return correct value when simulate the function.

Coverage of the tests of ```AnswerInputs``` and ```Model``` can reach 100%, but the performance is not good for ```GameCard```, because the functionalities with promise are not tested.