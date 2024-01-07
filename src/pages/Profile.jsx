import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { UserService } from '../services/api/requests/user/user.index'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'
import './Profile.css';

const Profile = () => {
  const { user } = useAuth()


  const [userDoc, setUserDoc] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isEdit, setIsEdit] = useState(false)
  const [isUpdated, setUpdated] = useState(false)


  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    setIsLoading(true)
    UserService.getUserByID(user._id)
      .then(th => {
        if (th) {
          setIsLoading(false)
          console.log("fetch user: ", th)
          setUserDoc(th)
        }

      })
    /*if(doc){
      setIsLoading(false)
      console.log("fetch user: ", doc)
      setUserDoc(doc)
    }*/
  }

  const displayEditing = (e) => {
    e.preventDefault()
    setIsEdit(prevCheck => !prevCheck);
  }

  const save = async (e) => {
    e.preventDefault()
    console.log("updated profile:", userDoc)

    const update_doc = userDoc

    const form_data = new FormData()
    form_data.append('_id', update_doc._id)
    form_data.append('name', update_doc.name)
    form_data.append('city', update_doc.city)
    form_data.append('email', update_doc.email)
    form_data.append('avatar', update_doc.file)

    const updated = await UserService.patchUserByID(userDoc._id, form_data)
    if (updated) {
      setUpdated(true)
      fetchUser()
    }
    setIsEdit(false)
  }

  const handleChange = (e) => {
    e.preventDefault()
    console.log(e.target.title)
    setUserDoc((prev) => { return { ...prev, ...{ [e.target.id]: e.target.value } } })
  }

  const changeImage = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0])
      let img = e.target.files[0]
      setUserDoc((prev) => { return { ...prev, ...{ [e.target.id]: URL.createObjectURL(img) } } })
      setUserDoc((prev) => { return { ...prev, ...{ "file": e.target.files[0] } } })

    }
  }


  return (
    <div>
      <h5></h5> {/*<Button size="sm" onClick={displayEditing}>Edit</Button>*/}


      <div className="block">
        <div className="left">
          <div className="img">

            {userDoc && userDoc.avatar ? <img src={userDoc.avatar} alt="img" /> : <img src="https://pixlr.com/images/index/ai-image-generator-two.webp" alt="img" />}

          </div>
          <div className='preview'>
            {isEdit && userDoc.avatar && <img className='img_preview' src={userDoc.avatar} alt="img" width={100} height={100} />}
          </div>
        </div>
        <div className="right">

          <div class="div_edit_btn" className='d-flex justify-content-end me-1'><button class="btn_edit" onClick={displayEditing}>Edit</button></div>

          <Form onSubmit={save}>
            {!isLoading && userDoc &&
              <>
                <div>
                  <span>Name: </span>
                  {/*<p>{userDoc.name ? userDoc.name : "user name"}</p>*/}
                  <input readOnly={!isEdit} defaultValue={userDoc.name ? userDoc.name : "name"} id="name" name="name" onChange={handleChange} />
                </div>
                <div>
                  <span>Email:</span>
                  <input readOnly={!isEdit} defaultValue={userDoc.email ? userDoc.email : "email"} id="email" name="email" onChange={handleChange} />
                </div>

                <div>
                  <span>City:</span>
                  <input readOnly={!isEdit} defaultValue={userDoc.city ? userDoc.city : "city"} id="city" name="city" onChange={handleChange} />
                </div>

                {isEdit && <div>
                  <span>Avatar:</span>
                  <input type="file" id="avatar" onChange={changeImage} />
                </div>}


              </>
            }
            {isEdit && <div className='d-flex justify-content-end me-1'><Button type="submit">Save</Button></div>}
          </Form>
        </div>
      </div>


      {isEdit && userDoc.avatar && <img src={userDoc.avatar} alt="img" width={100} height={100} />}

      {/*!isLoading && userDoc &&
        <Row xs={1} md={3} className="g-4 mt-4 justify-content-center">
          <Col style={{ width: '60rem' }}>
            <Card >
              <div className='d-flex justify-content-start text-start flex-column w-25 mx-auto '>
                <div>Name: {userDoc.name ? userDoc.name : "user name"}</div>
                <div>Email: {userDoc.email && userDoc.email} </div>
                <div>City: {userDoc.city ? userDoc.city : "city"}</div>
              </div>
            </Card>
          </Col>
        </Row> */
      }


      {/*isEdit &&
        <>
          <EditProfile state={userDoc} setState={setUserDoc} setIsEdit={setIsEdit} handleSubmit={save} isUpdated={isUpdated} />
        </>

       */

      }


      {isUpdated && <Alert className='mt-3' variant='success'>{"successMessage"}</Alert>}




    </div>
  )
}

const EditProfile = ({ setState, state, handleSubmit, isUpdated = false, setIsEdit }) => {

  const handleChange = (e) => {
    e.preventDefault()
    console.log(e.target.title)
    setState((prev) => { return { ...prev, ...{ [e.target.id]: e.target.value } } })
  }


  return (
    <div>

      <Row xs={1} md={2} className="g-4 mt-4 ">

        <Col style={{ width: '40rem' }} className='mx-auto'>
          <Card >
            <Card.Title className='mx-auto mt-3'>
              <h5>Edit Profile</h5>
            </Card.Title>
            <Card.Body>

              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="email">
                  <Form.Label column sm="2">
                    Email
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type='email' placeholder='E-Mail' title="email" defaultValue={state && state.email} onChange={handleChange} />

                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="name">
                  <Form.Label column sm="2" >
                    Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" title="name" placeholder="name" defaultValue={state && state.name} onChange={handleChange} />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="city">
                  <Form.Label column sm="2" >
                    City
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" title="city" placeholder="City" defaultValue={state && state.city} onChange={handleChange} />
                  </Col>
                </Form.Group>

                <Form.Group className='d-flex justify-content-end'>
                  <Button type="submit">Save</Button>

                </Form.Group>


              </Form>


            </Card.Body>
          </Card>
        </Col>


      </Row>


    </div>
  )
}



const AbstractEditProfile = ({

  fields = [{
    type: "text", title: "Name", id: "name",
    placeholder: "Name",
    defaultValue: "my_name",
  },
  {
    type: "text", title: "Email", id: "email",
    placeholder: "Email",
    defaultValue: "my_email",
  }
  ],

}) => {


  return (
    <div>
      <h5>Edit Profile</h5>

      <form className='d-flex flex-column gap-4'>
        {fields.map((m, i) => (<>
          <input type={m.type} name={m.id} id={m.id} placeholder={m.placeholder} defaultValue={m.defaultValue} />
        </>))}

        <Button>SAVE</Button>

      </form>





    </div>
  )
}


export default Profile
