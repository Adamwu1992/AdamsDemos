/**
 * Created by adam on 16/8/23.
 */



/**
 * 通用校验
 *
 * @returns {Boolean}
 */
function validate(){
    var tabs = mini.get('tabs1');
    var length = tabs.getTabs().length;
    var activeIndex;
    var isValid = false;
    for(var i = 0; i < length; i++) {
        activeIndex = (tabs.getActiveIndex()+1)%length;
        tabs.setActiveIndex(activeIndex);
        if (activeIndex == 0) {//第一个标签页校验
            var nsrjbxxForm = new mini.Form("#nsrjbxxForm");
            nsrjbxxForm.validate();
            isValid = nsrjbxxForm.isValid();
            if(!isValid) return isValid;
        }
        if (activeIndex == 1) {//第二个标签页校验
            var fzrxxForm = new mini.Form("#fzrxxForm");
            fzrxxForm.validate();
            isValid = fzrxxForm.isValid();
            if(!isValid) return isValid;
        }
        if (activeIndex == 2) {//第三个标签页校验
            var tzfxxForm = new mini.Form("#tzfxxForm");
            tzfxxForm.validate();
            isValid = tzfxxForm.isValid();
            if(!isValid) return isValid;
            isValid = validateGrid(zczbGrid);
            if(!isValid) return isValid;
            isValid = validateGrid(tzfxxGrid);
            if(!isValid) return isValid;
        }
        if (activeIndex == 3) {//第四个标签页校验
            var zfjgxxForm = new mini.Form("#zfjgxxForm");
            zfjgxxForm.validate();
            isValid = zfjgxxForm.isValid();
            if(!isValid) return isValid;
            isValid = validateGrid(fzjgxxGrid);
            if(!isValid) return isValid;
        }
    }
    return true;
}