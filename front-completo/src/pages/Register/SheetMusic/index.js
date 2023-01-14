import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Image } from "../../../components/Image";
import { Title } from "../../../components/Title";
import trebleClef from '../../../images/music-notes.png'
import { useEffect, useState } from "react";
import { Input } from '../../../components/Input'
import { api } from "../../../services/api";
import classes from './styles/styles.module.css'
import { toast } from 'react-toastify'
import { Worker } from '@react-pdf-viewer/core'
import { Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'

export function SheetMusic() {
  
  const [pdf, setPdf] = useState([])
  const [pdfFile, setPdfFile] = useState(null)
  const [pdfFileName, setPdfFileName] = useState('')
  // const [previewSheetMusic, setPreviewSheetMusic] = useState([])
  const [nome, setNome] = useState('')
  const [compositor, setCompositor] = useState('')
  const [orquestra, setOrquestra] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    document.title = 'Partituras'
  }, [])

  // const handleSelectSheetMusic = (event) => {
  //   if(!event.target.files) {
  //     return
  //   }

  //   const selectedSheetMusic = Array.from(event.target.files)

  //   setDocumento(selectedSheetMusic)

  //   const selectedSheetMusicPreview = selectedSheetMusic.map(sheetMusic => {
  //     return URL.createObjectURL(sheetMusic)
  //   })

  //   setPreviewSheetMusic(selectedSheetMusicPreview)
  // }

  useEffect(() => {
    const listOrchestra = async () => {
      try {
        const { data } = await api.get('/listarOrquestras')
        setData(data)
    
        return data
        
      } catch (error) {
        console.error(error.name)
        console.info(error.message)
      }
    }

    listOrchestra()
  }, [])

  const allowedFiles = ['application/pdf']
  
  const handlePdfFile = (event) => {
    let selectedFile = event.target.files[0]
    setPdfFileName(event.target.files[0].name)
    setPdf(event.target.files[0])
    
    if(selectedFile) {
      if(selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onload = (event) => {
          setPdfFile(event.target.result)
        }
      }
    }else{
      console.log('Escolha um PDF.')
    }
  }
  
  const handleSheetMusic = async () => {
    
    try {

      // const userData = {
      //   nome,
      //   compositor,
      //   orquestra: {
      //     codigo: Number(orquestra)
      //   },
      //   pdf
      // }
      
      const userData = new FormData()
      
      userData.append('nome', nome)

      userData.append('compositor', compositor)

      const orchestraCode = {
        orquestra: {
          codigo: Number(orquestra)
        }
      }
      
      userData.append('orquestra', orchestraCode.orquestra)
      userData.append('pdf', pdf)
      
      console.log(userData)
      
      // documento.forEach(documento => {
      //   userData.append('documento', documento)
      // })
  
      const headers = {
        // 'headers': {
        //   'content-type': 'application/json'
        // }
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
  
      const response = await api.post('/salvarPartitura', userData, headers)
  
      if(response.status === 200) {
        return toast.success('Partitura salva com sucesso!')
      }
  
      console.log(response.data)
  
      // throw new Error('A partitura não foi salva')
      
    } catch (error) {
      console.info(error.message)
      console.error(error.name)

      const { status } = error.request
      console.log(status)
      
      // if(status === 400) {
      //   return toast.error(error.message)
      // }

    }

  }
  
  const handleSubmit = async (event) => {
    event.preventDefault()
  
    await handleSheetMusic()
  }

  const isDisabled = !nome || 
                    !compositor || 
                    !orquestra
  
  return (
    <section className="container-body-login">
      <Link to='/maestro' title='Login'>
        <FaArrowLeft size={40} color='#131313' className="arrow-left" />
      </Link>

      <div className="container-login-register">
        { pdfFile ? (
          <div className={`container-image ${classes.container_pdf_view}`}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
              <Viewer fileUrl={pdfFile} />
            </Worker>
          </div>
        ) : (
          <Image 
            className='container-image'
            src={ trebleClef }
            alt='Clave de Sol'
          />
        ) }
        
        <div className="form-container">
          <Title 
            classNameContainer='form-header'
            id='form-header-register'
            classNameTitle='login-title'
            textTitle='Partituras'
          />

          <form method='post' encType="multipart/form-data" onSubmit={handleSubmit} className={`form-login ${classes.form_files}`}>

            <Input 
              type='text'
              name='nome'
              className='input-login'
              placeholder='Partitura'
              htmlFor='Nome da partirura'
              label='Nome da partitura:'
              value={nome}
              onChange={event => setNome(event.target.value)}
            />

            <Input 
              type='text'
              name='compositor'
              className='input-login'
              placeholder='Compositor'
              label='Compositor:'
              htmlFor='Compositor'
              value={compositor}
              onChange={event => setCompositor(event.target.value)}
            />

            <div className="category-container">
              <label htmlFor="Oquestras" className={`category-label ${classes.orchestra}`}>Orquestras:</label>
              <select 
                value={orquestra}
                name='orquestra'
                id='select-category'
                className="select"
                onChange={event => setOrquestra(event.target.value)}
              >
                <option value="">--Selecione--</option>
                { data.map((data, index) => {
                  
                  const { codigo, nome } = data
                  
                  return (
                    <option 
                      value={ codigo }
                      key={ index }
                    >
                      { nome }
                    </option>
                  )
                }) }
              </select>
            </div>

            <div className={classes.input_block}>
              {/* <div className="sheetMusic-container">
                { previewSheetMusic.map((sheetMusic, index) => {
                  return (
                    // estilizar
                    <span key={index}>{ sheetMusic }</span>
                  )
                }) }
              </div> */}

              <label htmlFor="file">Arquivo:</label>
              <label htmlFor="file" className={classes.inputFile}>
                <span className={pdfFile ? classes.hasPdfFile: classes.inputFile_custom}>
                  { pdfFile ? pdfFileName: null }
                </span> 
                <input 
                  type="file" 
                  name="pdf"
                  accept=".pdf"
                  id='file'
                  onChange={handlePdfFile}
                />
              </label>
            </div>

            <Button 
              type='submit'
              className={`button-login isButtonDisabled ${classes.save_button}`}
              disabled={ isDisabled }
            >
              Salvar
            </Button>
            
          </form>
        </div>

      </div>
    </section>
  )
}