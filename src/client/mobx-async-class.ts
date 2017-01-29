import mobxAsyncClass from '../../components/mobx-async-class'

export default  mobxAsyncClass(error => {
    console.log(error, error.stack)
})