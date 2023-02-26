//input mask bundle ip address
var refresherprop = 2;
var refresheruser = 2;
var userpass = "hi";
var proptime = "55:55:55";
var olddata = 0;
var propdata = "hi";
var oldproprdata = "dakfj";
var proptimenew = "33:333:33";
var prop = {};
var prop2 = {};
var selprop = 0;
var hostips = {};
var DNS = 1;
var oldcurrentinfo = "dlkfajsdl;";
var redflag = "";
var mydate;
var tempvar;
var allusers = "init";
var allgroups = { results: [{ id: "0", text: "NoGroup" }] };
var allpools = "init";
var selvalues = {};
var grpolddata;
var myidhash;
var mytimer;
var mymodal;
var cgrp = {};
var cuser = {};
var userlistflag = 0;
var userdata = "dksfj";
var olduserdata = "ksksksks";
var voldata = "hihihi";
var oldvoldata = "n;nolnlnn";
var volumes = { NoHome: "NoHome" };
var idletill = 480000;
var oldhdata = "dkd";
var oldpdata = "dkedfd";
var oldddata = "dkjlf";
var oldrdata = "kfld";
var selhosts = "";
var seldhosts = "";
var modaltill = idletill - 120000;
var userlisttable;
var myid = "<?php echo $_REQUEST['myid'] ?>";
myidhash = myid;
var myname = "<?php echo $_REQUEST['name'] ?>";
var example1_filter = $("#UserList_filter");
var firstRequests = 3;
$("#volsize").prop("disabled", true);
$("#HomeAddress").prop("disabled", true);
$("#HomeSubnet").prop("disabled", true);

$("#UnixAddUser").prop("disabled", true);
$("#UserPass").change(function (e) {
	if ($("#User").val().length > 2 && $("#UserPass").val().length > 2) {
		$("#UnixAddUser").prop("disabled", false);
	} else {
		$("#UnixAddUser").prop("disabled", true);
	}
});
$("#User").change(function (e) {
	if ($("#User").val().length > 2 && $("#UserPass").val().length > 2) {
		$("#UnixAddUser").prop("disabled", false);
	} else {
		$("#UnixAddUser").prop("disabled", true);
	}
});


function uploadUsersChecker(user, usersNames, poolNames, groupNames)
{
	let flag = false;
	// Checks if there is a name  and it is unique.
	if (usersNames.includes(user['name']) || user['name'] === undefined || user['name'] === '')
		flag = true;
	if ( user['Password'] === undefined || user['Password'].length < 3)
		flag = true;
	// Checks if the user selected a Pool.
	if (!(user['Volpool'] === undefined || user['Volpool'] === ''))
	{
		// Checks that the Pool is valid.
		if (!(poolNames.includes(user['Volpool'])))
			flag = true;
	}
	// Checks if the user selected a group.
	if (!(user['groups'] === undefined || user['groups'] === ''))
	{
		// Checks that each group selected is valid.
		user['groups'].split(',').forEach(group => {
			if (!(groupNames.includes(group)))
				flag = true
		});
	}
	// Checks if the user selected a HomeAddress.
	if (!(user['HomeAddress'] === undefined || user['HomeAddress'] === ''))
	{
		// Checks if the HomeAddress is in the correct form.
		if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(user['HomeAddress'])) {  
			flag = true;
		}
	}
	return flag;
}
function generateBadUsersTable(badusers,usersNames,groupNames,poolNames)
{
	let tableBody = '';
	badusers.forEach((user) => {
		let tableRow =  '<tr>';
		tableRow += `<td>${user['index'] + 1}</td>`;
		// Name
		if (usersNames.includes(user['name']))
			tableRow += `<td class="table-danger text-danger">${user['name']}</td>`;
		else if(user['name'] === undefined || user['name'] === '')
			tableRow += `<td class="table-danger"></td>`;
		else tableRow += `<td>${user['name']}</td>`;
		// Password
		if (user['Password'] === undefined || user['Password'] === '')
			tableRow += `<td class="table-danger"></td>`;
		else if (user['Password'].length < 3)
			tableRow += `<td class="table-danger text-danger">${user['Password']}</td>`;
		else tableRow += `<td>${user['Password']}</td>`;
		// Volpool
		if (!(user['Volpool'] === undefined || user['Volpool'] === ''))
		{
			if (!(poolNames.includes(user['Volpool'])))
				tableRow += `<td class="table-danger text-danger">${user['Volpool']}</td>`;
			else tableRow += `<td>${user['Volpool']}</td>`;
		}
		else if (user['Volpool'] === undefined || user['Volpool'] === '')
			tableRow += `<td>No Home</td>`;
		else tableRow += `<td>${user['Volpool']}</td>`;
		// Volsize
		if (!(user['Volsize'] === undefined || user['Volsize'] === ''))
			tableRow += `<td>${user['Volsize']}</td>`;
		else tableRow += `<td>1</td>`;
		// HomeAddress.
		if (!(user['HomeAddress'] === undefined || user['HomeAddress'] === ''))
		{
			if (user['HomeAddress'].split('.').length === 4)
			{
				let addressFlag = false;
				let addressHtml = [];
				user['HomeAddress'].split('.').forEach(number => {
					if (parseInt(number) > 255 || parseInt(number) < 0)
					{
						addressHtml.push(`<p class='text-danger'>${number}</p>`)
						addressFlag = true;
					} else addressHtml.push(`<p>${number}</p>`);
				});
				if (addressFlag)
					tableRow += `<td class="table-danger d-flex">${addressHtml.join('.')}</td>`;
				else tableRow += `<td>${user['HomeAddress']}</td>`;	
			} 
			else tableRow += `<td class="table-danger">${user['HomeAddress']}</td>`;
		} else tableRow += `<td>No Address</td>`;
		// Subnet
		if (!(user['HomeSubnet'] === undefined || user['HomeSubnet'] === ''))
			tableRow += `<td>${user['HomeSubnet']}</td>`;
		else tableRow += `<td>8</td>`;
		// Groups
		if (!(user['groups'] === undefined || user['groups'] === ''))
		{
			let groupsFlag = false;
			let groupHtml = [];
			user['groups'].split(',').forEach(group => {
				if (!(groupNames.includes(group)))
				{
					groupHtml.push(`<p class='text-danger'>${group}</p>`)
					groupsFlag = true;
				} else groupHtml.push(`<p>${group}</p>`);
			});
			if (groupsFlag) tableRow += `<td class='table-danger d-flex'>${groupHtml.join(',')}</td>`;
			else  tableRow += `<td>${user['groups']}</td>`;
		}
		else tableRow += `<td>No Groups</td>`;
		tableRow += '</tr>';
		tableBody += tableRow;
	})
	$("#badUsersBody").html(tableBody);
	$('#BadUserList').show();
}

function generateBadUsersDataTable(badusers,usersNames,groupNames,poolNames)
{
	let badUserListDataTable = $("#BadUserListDataTable").DataTable({
		data: badusers,
		columns: [
			{
				data: null,
				render: function (data, type, user) {return `<p>${user['index']}</p>`;},
			},
			{
				data: null,
				render: function (data, type, user) {
					if (usersNames.includes(user['name']))
						return `<p class="table-danger text-danger">${user['name']}</p>`;
					else if(user['name'] === undefined || user['name'] === '')
						return `<p class="table-danger emptyCell">|</p>`;
					else return`<p>${user['name']}</p>`;
				},
			},
			{
				data: null,
				render: function (data, type, user) {
					if (user['Password'] === undefined || user['Password'] === '')
						return `<p class="table-danger emptyCell">|</p>`;
					else if (user['Password'].length < 3)
						return `<p class="table-danger text-danger">${user['Password']}</p>`;
					else return `<p>${user['Password']}</p>`;
				},
			},
			{
				data: null,
				render: function (data, type, user) {
					if (!(user['Volpool'] === undefined || user['Volpool'] === ''))
					{
						if (!(poolNames.includes(user['Volpool'])))
							return `<p class="table-danger text-danger">${user['Volpool']}</p>`;
						else return`<p>${user['Volpool']}</p>`;
					}
					else if (user['Volpool'] === undefined || user['Volpool'] === '')
						return `<p>No Home</p>`;
					else return `<p>${user['Volpool']}</p>`;
				},
			},
			{
				data: null,
				render: function (data, type, user) {
					if (!(user['Volsize'] === undefined || user['Volsize'] === ''))
						return `<p>${user['Volsize']}</p>`;
					else return `<p>1</p>`;
				},
			},
			{
				data: null,
				render: function (data, type, user) {
					if (!(user['HomeAddress'] === undefined || user['HomeAddress'] === ''))
					{
						if (user['HomeAddress'].split('.').length === 4)
						{
							let addressFlag = false;
							let addressHtml = [];
							user['HomeAddress'].split('.').forEach(number => {
								if (/^\d+$/.test(number)){
									if (parseInt(number) > 255 || parseInt(number) < 0)
									{
										addressHtml.push(`<span class='text-danger'>${number}</span>`)
										addressFlag = true;
									} else addressHtml.push(`<span>${number}</span>`);
								} else {
										addressFlag = true;
										addressHtml.push(`<span class='text-danger'>${number}</span>`)
									}
							});
							if (addressFlag)
							return `<p class="table-danger d-flex">${addressHtml.join('.')}</p>`;
							else return `<p>${user['HomeAddress']}</p>`;	
						} 
						else return `<p class="table-danger">${user['HomeAddress']}</p>`;
					} else return `<p>No Address</p>`;
				},
			},
			{
				data: null,
				render: function (data, type, user) {
					if (!(user['HomeSubnet'] === undefined || user['HomeSubnet'] === ''))
					return `<p>${user['HomeSubnet']}</p>`;
					else return `<p>8</p>`;
				},
			},
			{
				data: null,
				render: function (data, type, user) {
					if (!(user['groups'] === undefined || user['groups'] === ''))
					{
						let groupsFlag = false;
						let groupHtml = [];
						user['groups'].split(',').forEach(group => {
							if (!(groupNames.includes(group)))
							{
								groupHtml.push(`<span class='text-danger'>${group}</span>`)
								groupsFlag = true;
							} else groupHtml.push(`<span>${group}</span>`);
						});
						if (groupsFlag) return `<p class='table-danger d-flex'>${groupHtml.join(',')}</p>`;
						else  return `<p>${user['groups']}</p>`;
					}
					else return `<p>No Groups</p>`;
				},
			},
			// {
			// 	data: null,
			// 	render: function (data, type, row) {
			// 		return (
			// 			'<a class="UnixDelUser" val="username" href="javascript:auserdel(\'' +
			// 			row.name +
			// 			"')\" >" +
			// 			'<img  src="dist/img/delete.png" alt="cannott upload delete icon">' +
			// 			"</a>"
			// 		);
			// 	},
			// },
		],
		rowReorder: true,
        columnDefs: [
            { orderable: true, className: 'reorder', targets: 0 },
			{ orderable: true, className: 'reorder', targets: 1 },
			{ orderable: true, className: 'reorder', targets: 3 },
			{ orderable: true, className: 'reorder', targets: 5 },
            { orderable: false, targets: '_all' }
        ]
	});
	badUserListDataTable.buttons().container().appendTo("#BadUserListDataTable_wrapper .col-6:eq(0)");
}
let ExcelToJSONParser = function() {
    this.parseExcel = function(file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {type: 'binary'});
        workbook.SheetNames.forEach(function(sheetName) {
			var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
			var json_object = JSON.stringify(XL_row_object);
			let parsedUsers = JSON.parse(json_object)
			let grouplist;
			let poolsList;
			let usersList;
			$.ajax({
				url: "api/v1/users/grouplist",
				dataType: "json",
				type: "GET",
				async: false,
				success: function(data) {
					grouplist = data.results;
				},
			});
			$.ajax({
				url: "api/v1/pools/poolsinfo",
				dataType: "json",
				type: "GET",
				async: false,
				success: function(data) {
					poolsList = data.results;
				},
			})
			$.ajax({
				url: "api/v1/users/userlist",
				async: false,
				type: "GET",
				dataSrc: "allusers",
				success: function(data) {
					usersList = data.allusers;
				},
			})
			let usersNames = usersList.map(user => user['name']);
			let poolNames = poolsList.map(pool => pool['text']);
			poolNames.push('No Address');
			poolNames.push('NoAddress')
			let groupNames = grouplist.map(group => group['text']);
			let badusers = [];
			parsedUsers.forEach((user, index) => {
				let flag = uploadUsersChecker(user, usersNames, poolNames, groupNames);
				if (flag === true)
				{
					let newBaduser = user;
					newBaduser['index'] = index
					badusers.push(newBaduser);
				}
				else usersNames.push(user['name']);
			});
			generateBadUsersTable(badusers,usersNames,groupNames,poolNames);
			generateBadUsersDataTable(badusers,usersNames,groupNames,poolNames);
        })
      };
      reader.onerror = function(ex) {
        console.log(ex);
      };
      reader.readAsBinaryString(file);
    };
  };

$('#uploaderInput').click(function(e) {
var files = e.target.files; 
if (files.length === 0)
{
	$('#BadUserList').hide();
	$('#upload-file-btn').hide();
	$("#BadUserListDataTable").dataTable().fnDestroy();
}
})

$('#uploaderInput').change(function(e) {
	var files = e.target.files; 
	if (files.length === 0)
	{
		$('#upload-file-btn').hide();
		$('#BadUserList').hide();
		return
	}
    var parsedExcel = new ExcelToJSONParser();
    parsedExcel.parseExcel(files[0]);
	$('#upload-file-btn').show();
})
$('#upload-file-btn').click(function() {
	var form_data = new FormData($('#upload-file')[0]);
	$.ajax({
		type: 'POST',
		url: 'api/v1/users/uploadUsers',
		data: form_data,
		contentType: false,
		cache: false,
		processData: false,
		success: function(data) {
			console.log('Success!');
		},
	});
});

function groupsrefresh() {
	$(".select2.multiple").select2({
		ajax: {
			url: "api/v1/users/grouplist",
			dataType: "json",
			// Additional AJAX parameters go here; see the end of this chapter for the full code of this example
			type: "GET",
			async: false,
		},
	});
}
function poolsrefresh() {
	$(".select2.pool")
		.select2({
			ajax: {
				url: "api/v1/pools/poolsinfo",
				dataType: "json",
				// Additional AJAX parameters go here; see the end of this chapter for the full code of this example
				type: "GET",
				async: false,
			},
		})
		.on("change", function () {
			var selectedValue = $('#UserVol option[value="' + this.value + '"]')[0].innerHTML;
			if ((selectedValue != "-----") & (selectedValue != "-------")) {
				$("#volsize").prop("disabled", false);
				$("#HomeAddress").prop("disabled", false);
				$("#HomeSubnet").prop("disabled", false);
			} else {
				$("#volsize").prop("disabled", true);
				$("#HomeAddress").prop("disabled", true);
				$("#HomeSubnet").prop("disabled", true);
			}
		});
}
function userlistrefresh() {
	userlisttable.ajax.reload(function () {
		var option;
		$(".usergroups").each(function () {
			var thisuser = $(this);
			var grps;
			assignedgrps = thisuser.data("grps");
			if (typeof assignedgrps == "number") {
				grps = [assignedgrps];
			} else {
				grps = assignedgrps.split(",");
			}
			$.each(grps, function (e, t) {
				if (t != "NoGroup") {
					var grp = allgroups["results"][t];
					option = new Option(grp.text, grp.id, true, true);
					thisuser.append(option).trigger("change");
				}
			});
			// manually trigger the `select2:select` event
			thisuser.trigger({
				type: "select2:select",
				params: {
					allgroups: allgroups,
				},
			});
			$(".chgpasswd").click(function (e) {
				userofpass = $(this).data("username");
			});
		});
		groupsrefresh();
		$(".select2.usergroups").on("change", function (e) {
			grpsval = $(this).data("grps").toString();
			if (grpsval == "NoGroup") {
				grpsval = "";
			}
			if (grpsval !== $(this).val().toString()) {
				$("#btn" + $(this).attr("id")).show();
				$(this).data("change", $(this).val().toString());
			} else {
				$(this).data("change", "");
				$("#btn" + $(this).attr("id")).hide();
			}
		});
		$(".select2.usergroups").trigger("change");
	});
}

function initUserlist() {
	userlisttable = $("#UserList").DataTable({
		//"responsive": true, "lengthChange": true, "autoWidth": true, "info":true,
		order: [[1, "desc"]],
		//"buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
		ajax: {
			url: "api/v1/users/userlist",
			async: false,
			type: "GET",
			dataSrc: "allusers",
		},
		columns: [
			{
				data: "name",
			},
			{ data: "pool" },
			{ data: "size" },
			{
				data: "groups",
				render: function (data, type, row) {
					return (
						'<select class="select2 multiple usergroups ' +
						row.name +
						' form-control"' +
						' multiple="multiple" data-name=' +
						row.name +
						'  onclick="tdisclicked(this)"' +
						'data-grps="' +
						row.groups +
						'" value=[0] data-change="" id="sel' +
						row.name +
						'"></select>'
					);
				},
			},
			{
				data: null,
				render: function (data, type, row) {
					return (
						'<button onclick="selbtnclickeduser(this)" id="btnsel' +
						row.name +
						'" ' +
						'type="button" data-name=' +
						row.name +
						'  class="btn btn-primary" > update</button>'
					);
				},
			},
			{
				data: null,
				render: function (data, type, row) {
					return (
						'<a href="#modal-sm" data-username="' +
						row.name +
						'" data-toggle="modal" data-target="#modal-sm" class="chgpasswd">' +
						'<img src="dist/img/edit.png" alt="cannott upload edit icon">' +
						"</a>"
					);
				},
			},
			{
				data: null,
				render: function (data, type, row) {
					return (
						'<a class="UnixDelUser" val="username" href="javascript:auserdel(\'' +
						row.name +
						"')\" >" +
						'<img  src="dist/img/delete.png" alt="cannott upload delete icon">' +
						"</a>"
					);
				},
			},
		],
		columnDefs: [
			{
				createdCell: function (td, cellData, rowData, row, col) {
					$(td).data("grps", "cell-" + cellData);
				},
			},
		],
	});
	userlisttable.buttons().container().appendTo("#UserList_wrapper .col-6:eq(0)");
	//userlistrefresh();
}
initUserlist();

var ipv4_address = $(".ipaddress");
ipv4_address.inputmask();

function selbtnclickeduser(ths) {
	//$.post("./pump.php", { req:"UnixChangeUser", name:x.id.replace('btnsel',''), passwd:'groups'+$("#"+x.id.replace('btn','')).val()+" "+myname });
	var apiurl = "api/v1/users/userchange";
	nam = $(ths).data("name");
	console.log("name", nam);
	var apidata = {
		name: nam,
		groups: $("#sel" + nam)
			.val()
			.toString(),
	};
	postdata(apiurl, apidata);
}
$("#UnixAddUser").click(function (e) {
	var apiurl = "api/v1/users/UnixAddUser";
	var ipaddr = $("#HomeAddress").val();
	if ($("#HomeAddress").val() == "") {
		ipaddr = "NoAddress";
	}
	var apidata = {
		name: $("#User").val(),
		Volpool: $("#UserVol").val(),
		groups: $("#Usergroups").val().toString(),
		Password: $("#UserPass").val(),
		Volsize: $("#volsize").val(),
		HomeAddress: ipaddr,
		HomeSubnet: $("#HomeSubnet").val(),
		Myname: "mezo",
	};
	postdata(apiurl, apidata);

	e.preventDefault();
});

function auserdel() {
	var apiurl = "api/v1/users/userdel";
	var apidata = { name: arguments[0], Myname: "mezo" };
	postdata(apiurl, apidata);
}

function refreshall() {
	var newallgroups = "new0";
	$(".odd").css("background-color", "rgba(41,57,198,.1)");
	updatetasks();
	$.ajax({
		url: "api/v1/users/grouplist",
		type: "GET",
		async: true,
		//beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://10.11.11.241:8080');},

		success: function (data) {
			newallgroups = data;
			if (JSON.stringify(allgroups) != JSON.stringify(newallgroups)) {
				allgroups = newallgroups;
				console.log("allgroupchange", allgroups, newallgroups);
				groupsrefresh();
			}
			if (firstRequests > 0) firstRequests = firstRequests - 1;
		},
	});
	var newallpools = "new0";
	$.ajax({
		url: "api/v1/pools/poolsinfo",
		type: "GET",
		async: true,
		//beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://10.11.11.241:8080');},

		success: function (data) {
			newallpools = data;
			if (JSON.stringify(allpools) != JSON.stringify(newallpools)) {
				allpools = newallpools;
				poolsrefresh();
			}
			if (firstRequests > 0) firstRequests = firstRequests - 1;
		},
	});

	var newallusers = "new0";
	$.ajax({
		url: "api/v1/users/userlist",
		async: true,
		type: "GET",
		dataSrc: "allusers",
		success: function (data) {
			newallusers = data;
			if (JSON.stringify(allusers) != JSON.stringify(newallusers)) {
				allusers = newallusers;
				userlistrefresh();
			}
			if (firstRequests > 0) {
				firstRequests = firstRequests - 1;
			}
		},
	});
}
setInterval(refreshall, 2000);
firstRequestsInterval = setInterval(() => {
	if (firstRequests == 0) {
		$("#Loading").addClass("show_or_hide_other");
		setTimeout(() => {
			console.log("FirstRequests Done");
			clearInterval(firstRequestsInterval);
		}, 10);
	}
}, 100);

$(".chgpasswd").click(function (e) {
	userofpass = $(this).data("username");
});
