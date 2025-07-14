// import React from 'react';
// import { FaArrowLeft } from 'react-icons/fa';
// import { useHistory } from 'react-router-dom';
// import styled from 'styled-components';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 0.5rem;
//   padding-top: 2rem;
//   width:100%;
// `;

// const Header = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   width: 70%;
// `;

// const LeftArrow = styled(FaArrowLeft)`
//   font-size: 1.5rem;
//   display: flex;
//   align-items: center;
//   cursor: pointer;
// `;

// const Title = styled.h2`
//   font-size: 2.1rem;
//   font-weight: bold;
//   color: #1a1a1a;
// `;

// const Divider = styled.hr`
//   border: none;
//   height: 1px;
//   background: linear-gradient(
//     to right,
//     rgba(106, 168, 79, 0),
//     #6aa84f,
//     rgba(106, 168, 79, 0)
//   );
// `;

// const BarIndicator = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 0.4rem;
//   margin-top: 0.4rem;
// `;

// const Bar = styled.span`
//   width: 20px;
//   height: 3px;
//   background-color: var(--nonactive-horizontal-dot-background-color);
//   border-radius: 2px;

//   &.active {
//     background-color: var(--active-horizontal-dot-background-color);
//   }
// `;

// function HeaderComponent() {
//   const history = useHistory();

//   const handleBack = () => {
//     history.goBack();
//   };

//   return (
//     <Container>
//       <Header>
//         <LeftArrow onClick={handleBack} />
//         <Title>Select Locker</Title>
//       </Header>
//       <Divider />
//       <BarIndicator>
//         <Bar className="active" />
//         <Bar />
//         <Bar />
//       </BarIndicator>
//     </Container>
//   );
// }

// export default HeaderComponent;
