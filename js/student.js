function email_checked(email){
	return /^[^\s@]+@[^\s@]+[^\s@]+$/.test(email)
}


function save(){
	let fullname = document.getElementById('fullname').value;
	let email = document.getElementById('email').value;
	let phonenumber = document.getElementById('phonenumber').value;
	let address = document.getElementById('address').value;
	let gender = '';

	if(document.getElementById('male').checked){
		gender = document.getElementById('male').value;
	}
	else if(document.getElementById('female').checked){
		gender = document.getElementById('female').value;
	}

	///Lỗi cho họ tên
	if(_.isEmpty(fullname)){
		document.getElementById('fullname-error').innerHTML = 'Vui lòng nhập tên';
	}
	else if(fullname.trim().length <= 2){
		fullname = '';
		document.getElementById('fullname-error').innerHTML = 'Họ tên quá ngắn';
	}
	else if(fullname.trim().length >= 50){
		fullname = '';
		document.getElementById('fullname-error').innerHTML = 'Họ tên quá dài';
	}
	else{
		document.getElementById('fullname-error').innerHTML = '';
	}
	

	////Lỗi cho Email
	if(_.isEmpty(email)){
		document.getElementById('email-error').innerHTML = 'Vui lòng nhập Email';
	}
	else if(!email_checked(email)){
		email = '';
		document.getElementById('email-error').innerHTML = 'Email không đúng định dạng';
	}
	else{
		document.getElementById('email-error').innerHTML = '';
	}

	///Lỗi cho số điện thoại
	if(_.isEmpty(phonenumber)){
		document.getElementById('phonenumber-error').innerHTML = 'Vui lòng nhập số điện thoại';
	}
	else if(phonenumber.trim().length >= 11){
		phonenumber = '';
		document.getElementById('phonenumber-error').innerHTML = 'Số điện thoại hông hợp lệ';
	}
	else{
		document.getElementById('phonenumber-error').innerHTML = '';
	}

	///Lỗi cho địa chỉ
	if(_.isEmpty(address)){
		document.getElementById('address-error').innerHTML = 'Vui lòng nhập địa chỉ';
	}
	else{
		document.getElementById('address-error').innerHTML = '';
	}

	///Lỗi cho giới tính
	if(_.isEmpty(gender)){
		document.getElementById('gender-error').innerHTML = 'Vui lòng chọn giới tính ';
	}
	else{
		document.getElementById('gender-error').innerHTML = '';
	}


	///Thông tin nhập hợp lệ-> Lấy thông tin người dùng

	if(fullname && email && phonenumber && address && gender){
		let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
		students.push({
			fullname: fullname,
			email: email,
			phonenumber: phonenumber,
			address: address,
			gender: gender,
		});

		localStorage.setItem('students', JSON.stringify(students));
		
		this.senderListStudent();
		

	///Lấy thông tin người dùng là lưu nó
	}



}


function senderListStudent()
{
	let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

	if(students.length === 0) {
		document.getElementById('list_student').style.display = 'none';
		return false;
	}


	document.getElementById('list_student').style.display = 'block';
	let tableContent = `<tr>
		<td>#</td>
		<td>Họ Tên</td>
		<td>Email</td>
		<td>Điện thoại</td>
		<td>Địa chỉ</td>
		<td>Giới Tính</td>
		<td>Chức năng</td>
	</tr>`;

	students.forEach((students, index) =>{
			let studentId = index ;
			index++;
			let check_gender = parseInt (students.gender) === 1	 ? "Nam" : "Nữ";
			tableContent += `<tr>
				<td>${index}</td>
				<td>${students.fullname}</td>
				<td>${students.email}</td>
				<td>${students.phonenumber}</td>
				<td>${students.address}</td>
				<td>${check_gender}</td>
				<td>
					<a href="#">Edit</a> | <a href="#" onclick='deleteStudents(${studentId})'>Delete</a> 
				</td>
			</tr>`;

		})

		document.getElementById('table-students').innerHTML = tableContent;
}

function deleteStudents(id) {
	let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
	students.splice(id, 1);
	localStorage.setItem('students', JSON.stringify(students));
	senderListStudent();
}