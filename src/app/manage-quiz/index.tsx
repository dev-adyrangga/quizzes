import { QuizTypes } from '@/components/forms/quiz-form/types'
import PageContainer from '@/components/page-container'
import PageHeading from '@/components/page-heading'
import useAppRouter from '@/hooks/use-app-router'
import { useAppTranslation } from '@/hooks/use-app-translation'
import appNavigation from '@/utils/app-navigation'
import { Button, Table } from 'flowbite-react'

type ManageQuizPageProps = {
  quizList?: QuizTypes[]
}

const ManageQuizPage = ({ quizList = [] }: ManageQuizPageProps) => {
  const router = useAppRouter()
  const { translate } = useAppTranslation()

  const onClickAddQuizHandler = () => {
    appNavigation.navToAddQuiz(router)
  }
  const onClickEdit = (quizId: string) => {
    appNavigation.navToEditQuiz(router, quizId)
  }

  const onClickDelete = (quizId: string) => {
    throw new Error('Function not implemented.')
  }

  return (
    <PageContainer>
      <main className="p-2 md:p-6">
        <div className="flex flex-row justify-between items-center mb-2 md:mb-4">
          <PageHeading>{translate('manage-quiz.heading')}</PageHeading>
          <Button
            color="blue"
            className="font-bold"
            onClick={onClickAddQuizHandler}
          >
            {translate('manage-quiz.button.add-quiz')}
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table striped>
            <Table.Head>
              <Table.HeadCell className="bg-blue-500 text-white font-bold">
                Quiz Title
              </Table.HeadCell>
              <Table.HeadCell className="bg-blue-500 text-white font-bold">
                Number of Questions
              </Table.HeadCell>
              <Table.HeadCell className="bg-blue-500 text-white font-bold">
                Action
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {quizList.map((quiz, idx) => {
                return (
                  <Table.Row key={idx} className="bg-white">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                      {quiz[router.locale]}
                    </Table.Cell>
                    <Table.Cell>{quiz.questions.length}</Table.Cell>
                    <Table.Cell className="flex flex-row gap-4 py-2 justify-end">
                      <Button
                        size="sm"
                        pill
                        onClick={() => onClickEdit(quiz.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        pill
                        color="failure"
                        onClick={() => onClickDelete(quiz.id)}
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </div>
      </main>
    </PageContainer>
  )
}

export default ManageQuizPage
