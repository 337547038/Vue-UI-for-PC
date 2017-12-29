/**验证规则,通过返回空，不通过返回错误提示
 * 示例
 * var rulesTest = [
 * {type: "required", msg: "required0"},
 * {type: "digits", msg: "digits0"},
 * {type: "mail", msg: "mail0"},
 * {type: "rule", rule: "/^(?:[1-9][0-9]?|1[01][0-9]|120)$/", msg: "rule"},
 *  {type: "fn", msg: "fn", validator: function (v) {
 return false
 }}
 * ];*/
var Rules = {
    digits: /^[0-9]*[1-9][0-9]*$/,//正整数
    number: /^\d+(\.\d+)?$/,//带小数
    mobile: /^1[3|4|5|7|8]\d{9}$/,//手机
    mail: /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$/,
    tel: /^0\d{2,3}-\d{7,8}$/,//电话020-00000
    //mm: '/^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$|^1[3|4|5|7|8]\d{9}$/',//邮箱或手机
    fax: /^(\d{3,4})?[-]?\d{7,8}$/
};
var isEmpty = function (v) {
    return /^\s*$/g.test(v);
};
var isRules = function (v, r, type) {
    if (type === 'rule') {
        return eval(r).test(v);
    }
    else {
        if (Rules[r] == undefined) {
            return 'undefined';//按通过处理
        }
        return eval(Rules[r]).test(v);
    }
};
var ValidateRules = function (v, rules) {
    if (v === false) {
        v = '';
    }
    for (var i = 0; i < rules.length; i++) {
        var r = rules[i];
        switch (r.type) {
            case 'required':
                if (isEmpty(v)) {
                    return r.msg;
                }
                break;
            case 'digits':
            case 'number':
            case 'mobile':
            case 'mail':
            case 'tel':
            //case 'mm':
            case 'fax':
                if (!isEmpty(v) && !isRules(v, r.type)) {
                    return r.msg;
                }
                break;
            case 'maxLength':
                if (!isEmpty(v) && (parseInt(v.length) > parseInt(r.maxLength))) {
                    return r.msg;
                }
                break;
            case 'minLength':
                if (!isEmpty(v) && (parseInt(v.length) < parseInt(r.minLength))) {
                    return r.msg;
                }
                break;
            case 'rule':
                if (!isEmpty(v) && !isRules(v, r.rule, 'rule')) {
                    return r.msg;
                }
                break;
            case 'fn':
                if (!r.validator(v)) {
                    return r.msg;
                }
                break;
            default:
                break;
        }
    }
    return '';
};
module.exports = ValidateRules;