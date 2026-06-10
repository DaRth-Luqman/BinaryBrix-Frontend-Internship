// Carousel
{
    var slide = document.querySelector('.slide');
    var noOfSlides = slide.children.length;
    var ind = 0;
    function forNext(event) {
        ind = (ind + 1) % noOfSlides;
        slide.style.transform = "translateX(-" + (ind * 100) + "%)"
    }
    function forPrev(event) {
        ind = (ind - 1 + noOfSlides) % noOfSlides;
        slide.style.transform = "translateX(-" + (ind * 100) + "%)"
    }
    document.querySelector('.icon1').addEventListener('click', forPrev);
    document.querySelector('.icon2').addEventListener('click', forNext);
}
// Accordian
{
    var qList = document.querySelectorAll('.question');
    qList.forEach(q => {
        q.addEventListener('click', () => {
            var qParent = q.parentElement;
            var isActive = qParent.classList.contains('active');
            document.querySelectorAll('.accitem').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelectorAll('.icon3').forEach(i => {
                i.style.transform = 'rotate(0deg)';
            });
            if (!isActive) {
                qParent.classList.add('active');
                var icon = document.querySelectorAll('.icon3');
                icon.forEach(i => {
                    if (i.parentElement.parentElement.classList.contains('active')) {
                        i.style.transform = "rotate(180deg)";
                    }
                });
            }
        });
    });
}
//Modal
{
    var title = document.querySelector('.title1');
    title.addEventListener('click', () => {
        document.querySelector('.moditem').style.display = "flex";
    })
    var close = document.querySelector('.icon4');
    close.addEventListener('click', () => {
        document.querySelector('.moditem').style.display = "none";
    })
    var outside = document.querySelector('.moditem');
    outside.addEventListener('click', e => {
        if (e.target === e.currentTarget) {
            outside.style.display = "none";
        }
    })
}
//Tabs
{
    var tNList = document.querySelectorAll('.tabname');
    var tIList = document.querySelectorAll('.tabitem');
    tNList.forEach((tN, i) => {
        tN.addEventListener('click', () => {
            tNList.forEach(tab => tab.classList.remove('active'));
            tIList.forEach(panel => panel.style.display = 'none');
            tN.classList.add('active');
            tIList[i].style.display = 'block';
        });
    });
    tNList[0].click();
}
//Owl
{
    var cards = document.querySelector('.cards');
    var pages = cards.children.length;
    var ind = 0;
    function forNext(event) {
        ind = (ind + 1) % pages;
        cards.style.transform = 'translateX(calc(-' + (ind * 100) + '% - ' + (ind * 8) + 'vw))';
    }
    function forPrev(event) {
        ind = (ind - 1 + pages) % pages;
        cards.style.transform = 'translateX(calc(-' + (ind * 100) + '% - ' + (ind * 8) + 'vw))';
    }
    document.querySelector('.icon5').addEventListener('click', forPrev);
    document.querySelector('.icon6').addEventListener('click', forNext);
}