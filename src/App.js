
import './App.css';
import FormGenerator from './components/FormGenerator/FormGenerator';
import FormViewer from './components/FormViewer/FormViewer';
import ShowJson from './components/ShowJson/ShowJson';
import { useSelector } from 'react-redux';

function App() {

  const generatedFields = useSelector(state => state.fields)
  console.log("fields", generatedFields)

  return (
    <div className="app">
      <div className='form_container'>
        <div className='form_box'>
          <FormGenerator />
        </div>
        <div className='json_box' style={{overflow:"auto"}}>
          <ShowJson jsonFields={generatedFields} />
        </div>
      </div>
      <FormViewer />
    </div>
  );
}

export default App;
