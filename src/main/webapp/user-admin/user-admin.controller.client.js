var usernameFld
var passwordFld
var firstnameFld
var lastNameFld
var roleFld
var createBtn
var addUserBtn
var theTableBody
var $updateBtn
var userService = new UserServiceClient()

function addUser() {
    createUser({
        username: usernameFld,
        password: passwordFld,
        first: firstnameFld,
        last: lastNameFld,
        role: roleFld
    })
}
var users = [];

function createUser(user) {
    userService.createUser(user)
        .then(function (actualUser) {
            users.push(actualUser)
            renderUsers(users)
        })
}

var selectedUser = null
function selectUser(event) {
    var selectBtn = jQuery(event.target)
    var theId = selectBtn.attr("id")
    selectedUser = users.find(user => user._id === theId)
    usernameFld.val(selectedUser.username)
    passwordFld.val(selectedUser.password)
    firstnameFld.val(selectedUser.first)
    lastNameFld.val(selectedUser.last)
    roleFld.val(selectedUser.role)
}

function deleteUser(event) {
    console.log(event.target)
    var deleteBtn = jQuery(event.target)
    var theClass = deleteBtn.attr("class")
    var theIndex = deleteBtn.attr("id")
    var theId = users[theIndex]._id
    console.log(theClass)
    console.log(theIndex)

    userService.deleteUser(theId)
        .then(function (status) {
            users.splice(theIndex, 1)
            renderUsers(users)
        })
}

function renderUsers(users) {
    theTableBody.empty()
    for (var i = 0; i < users.length; i++) {
        var user = users[i]
        theTableBody
            .prepend(`
    <tr>
        <td>${user.username}</td>
        <td>${user.password}</td>
        <td>${user.first}</td>
        <td>${user.last}</td>
        <td>${user.role}</td>
        <td>
            <span>
                <i class="fa-2x fa fa-times wbdv-remove" id="${i}"></i>
                <i class="fa-2x fa fa-pencil wbdv-edit" id="${user._id}"></i>
            
            </span>
        </td>
    </tr>
  `)
    }
    jQuery(".wbdv-remove")
        .click(deleteUser)
    jQuery(".wbdv-edit")
        .click(selectUser)
}

function updateUser() {
    console.log(selectedUser)
    selectedUser.username = usernameFld.val()
    selectedUser.password = passwordFld.val()
    selectedUser.first = firstnameFld.val()
    selectedUser.last = lastNameFld.val()
    selectedUser.role = roleFld.val()

    userService.updateUser(selectedUser._id, selectedUser)
        .then(function (status) {
            var index = users.findIndex(user => user._id === selectedUser._id)
            users[index] = selectedUser
            renderUsers(users)
        })
    usernameFld.val("")
    passwordFld.val("")
    firstnameFld.val("")
    lastNameFld.val("")
}

function findUserById() {

}

function main() {
    usernameFld = $(".wbdv-username-fld")
    passwordFld = $(".wbdv-password-fld")
    firstnameFld = $(".wbdv-firstname-fld")
    lastNameFld = $(".wbdv-lastname-fld")
    roleFld = $(".wbdv-role-fld")

    $createBtn = $(".wbdv-create")
    $updateBtn = $(".wbdv-update")
    theTableBody = jQuery("tbody")

    $updateBtn.click(updateUser)
    $createBtn.click(() => {
            createUser({
                username: usernameFld.val(),
                password: passwordFld.val(),
                first: firstnameFld.val(),
                last: lastNameFld.val(),
                role: roleFld.val()
            })
            usernameFld.val("")
            passwordFld.val("")
            firstnameFld.val("")
            lastNameFld.val("")
        }
    )

    userService.findAllUsers()
        .then(function (actualUsersFromServer) {
            users = actualUsersFromServer
            renderUsers(users)
        })
}
jQuery(main)
