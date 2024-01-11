import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import HomeCard from '@/components/HomeCard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSession } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    console.log(session);
    console.log('Logged in as:', session.user.email);
  }
  return (
    <>
      <Container className='position-relative'>
        <Row>
          <Col><HomeCard src="/images/legoLogo.png"/></Col>
          <Col><HomeCard src="/images/legoLogo.png"/></Col>
          <Col><HomeCard src="/images/legoLogo.png"/></Col>
        </Row>
      </Container>
      
    </>
  )
}
