'use strict'

let groups = [];
let users = [];

const delay = 3000; //3 seconds
const maxIterations = 40; //after 39-th iteration will return a timeout error (2 minutes timeout)

VK.init(function() {
    const params = getQueryParams(window.location);

    $('.submit').click(function() {
        groups = [];
        getAllCheckedElements('.groupList', groups, function(arr) {
            console.log(arr);

            $('.popupContainer').css('display', 'block')
            $('.userList').append('<li>Это может занять до нескольких минут...</li>');

            knock('getIntersections', {
                    groups: groups
                },
                function(res) {
                    //console.log(res)
                    $('.userList').empty();
                    res.data.map(function(el, i) {
                        setTimeout(function() {
                            VK.api('users.get', { 'user_ids': el, 'fields': 'photo_50,city,verified' }, 
                                function(r) {
                                    console.log(r);
                                    $('.userList').append(userInfo(
                                        r.response[0].photo_50, 
                                        r.response[0].id, 
                                        r.response[0].first_name + 
                                        " " + r.response[0].last_name))
                                }
                            );
                        }, i * 400);
                    })
                });
        });
    });

    $('.closeModalWindow').click(function() {
        $('.popupContainer').css('display', 'none');
        $('.userList').empty();
    });

    VK.api('groups.get', {
        'user_id': params['user_id'],
        'extended': true
    }, function(r) {
        r.response.items.map(function(el, i) {
            if (i > 0) {
                setTimeout(function() {
                    VK.api('groups.getMembers', {
                            'group_id': el.screen_name,
                            'count': 0
                        },
                        function(_r) {
                            const maxMembersCount = 100000;
                            const respCount = _r.response.count;
                            const type = el.type == 'page' ? 'Паблик' : 'Группа';
                            let name = el.name;
                            let memberCountString = respCount + (el.type == 'page' ? ' подписчиков' : ' участников');
                            memberCountString += respCount > maxMembersCount ? ' (не рекомендуется)' : '';
                            const valid = respCount > maxMembersCount ? 'notValidGroup' : 'validGroup';

                            if (name.length > 35) {
                                name = name.slice(0, 35);
                                name = name + '...';
                            }

                            $('.groupList').append('<li class="groupItem" source="' + el.id + '"><div class="checkerArea"><input class="checkbox" type="checkbox"></div><img src="' + el.photo_100 + '" alt="" class="avatar"><div class="nonCheckerArea"><a class="name" href = "https://vk.com/' + el.screen_name + '">' + name + '</a><span class="isClosed">' + type + '</span><span class="' + valid + ' memberCount">' + memberCountString + '</span></div></li>');
                        });
                }, i * 400)
            }
        })
    });

}, function() {}, '5.57');

const getQueryParams = (qs) => {
    qs = qs + '';
    qs = qs.split('+').join(' ');

    let params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

const getAllCheckedElements = (className, arr, _callback) => {
    $(className).children().map(function(i, el) {
        if (el.children[0].children[0].checked) {
            //$(el).css('background-color', '#dfd')
            arr.push($(el).attr('source'));
        }
        if (i === $(className).children().length - 1) {
            _callback(groups)
        }
    })
}

const userInfo = (photo_50, id, name) => {
    return '<li class="userElement">' +
        '<img src="' + photo_50 + '" alt="" class="avatar">' +

        '<div class="info">' +
        '<a class="name" href="https://vk.com/id' + id + '">' + name + '</a>' +
        '</div>' +
        '</li>'
}

const errorMessage = () => {
    return '<li class="userElement">Истекло время ожидание ответа сервера. Попробуйте выбрать группы с меньшим кол-во людей.</li>';
}

function knock(url, data, _callback) {
    let token;
    let finished = false;

    for (let i = 0; i < maxIterations; i++) {

        setTimeout(function() {
            if (!finished) {
                console.log('knock')
                if (i === 0) {
                    query(data, url, function(res) {
                        token = res.token;
                        console.log(res)
                    })
                } else {
                    query({
                        token: token
                    }, url, function(res) {
                        console.log(res)
                        if (res.data) {
                            finished = true;
                            return _callback(res);
                        }
                    });
                }
            
                if(i === maxIterations - 1) {
                    $('.userList').empty();
                    $('.userList').append(errorMessage());
                }
            }
        }, i * delay)
    }
}

function query(data, url, _callback) {
    $.ajax({
        url: url,
        data: data,
        success: _callback
    });
}