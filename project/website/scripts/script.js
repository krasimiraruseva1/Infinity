const navigation = document.querySelector('nav');

document.querySelector('.toogle').onclick = function() {
    this.classList.toggle('active');
    navigation.classList.toggle('active');
}