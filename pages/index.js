import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import HomeCard from '@/components/HomeCard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Container>
        <Row>
          <Col><HomeCard src="/images/legoLogo.png"/></Col>
          <Col><HomeCard src="/images/legoLogo.png"/></Col>
          <Col><HomeCard src="/images/legoLogo.png"/></Col>
        </Row>
      </Container>
      
    </>
  )
}
